//import DropDown from "../DropDown/DropdonwList";
import Image from "next/image";
import ColorPallet from "@/../public/ProspectsList/colorPallet.png"
import ListLayout from "@/../public/ProspectsList/listLayout.png"
import BlockLayout from "@/../public/ProspectsList/blockLayout.png"
import { useUserInfoStore } from "@/store/userInfoStore";
import { getStatusColorFromProspect } from "@/lib/findStatusColor";

import Styles from "./prospectsList.module.css"
import { useState } from "react";
import SimpleMediumCard from "../Card/SimpleMediumCard";
import DropDown from "../DropDown/DropdownList";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import { Prospects } from "@/lib/dbInterface";
import { useRouter } from "next/navigation";
import NameCardSmallAndFull from "../Card/NameCardSmallAndFull";
import { useFilterContext } from "@/app/(context)/ChosenFilter";
import { useSortContext } from "@/app/(context)/ChosenSort";

export default function FilterAndDisplayArea() {
  const router = useRouter(); 
  const [displayStyle,setDisplayStyle] = useState<"listLayout"|"blockLayout">("listLayout")

  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const setClickedProspectData = useClickedProspectInfoStore((state) => state.setProspect);
  const {chosenFilter,changeChosenFilterStatus} = useFilterContext();
  const {chosenSort,changeChosenSortStatus} = useSortContext();

  const selectedFilterValue = (selectedValue: string) => {
    changeChosenFilterStatus(selectedValue);
  };
  
  const selectedSortValue = (selectedValue: string) => {
    changeChosenSortStatus(selectedValue);
  };

  const colorPalletClickHandler = () => {
    console.log("ColorPallet")
  }
  const listLayoutClickHandler = () => {
    setDisplayStyle("listLayout")
  }
  const blockLayoutClickHandler = () => {
    setDisplayStyle("blockLayout")
  }

  const clickedProspectCardHandler = (prospectInfo:Prospects) => {
    setClickedProspectData(prospectInfo)
    router.push(`/prospectslist/${prospectInfo.id}`)
  }

  return (
    <>
      {/* Filter and DisplayOption */}
      <div className={`flex justify-between ${Styles.filterDisplayLayout} ${Styles.flexCol} m-auto`}>
        <div className={`flex gap-[1rem] items-center ${Styles.flexCol}`}>
          <DropDown filter="Filter" value={chosenFilter} onChange={selectedFilterValue}/>
          <DropDown filter="Sort" value={chosenSort} onChange={selectedSortValue}/>
        </div>
        <div className="flex justify-evenly gap-[2rem]">
          <Image
            className={`${Styles.iconSize}`}
            onClick={colorPalletClickHandler}
            src={ColorPallet}
            alt="colorPallet"
            height={100}
            width={100}
          />
          <Image
            className={`${Styles.iconSize}`}
            onClick={listLayoutClickHandler}
            src={ListLayout}
            alt="listLayout"
            height={100}
            width={100}
          />
          <Image
            className={`${Styles.iconSize}`}
            onClick={blockLayoutClickHandler}
            src={BlockLayout}
            alt="blockLayout"
            height={100}
            width={100}
          />
        </div>
      </div>

      {/* Display Card*/}
      <div className={`max-h-[70vh] overflow-y-scroll flex m-auto bg-yellow-50 border-2 border-gray-300 rounded-md
        ${Styles.displayPadding}
        ${Styles.filterDisplayLayout}
        ${displayStyle==="listLayout"?Styles.listCardLayout:Styles.blockCardLayout}  
      `}>
        {userData?.prospectList?.prospects && userData?.prospectList?.prospects.length <=0 ? <h2 className={`${Styles.textFont} text-center`}>No Data,,,</h2>
        :<>
          {userData?.prospectList?.prospects.filter((prospect)=>{
            const contentsSet = new Set(userData.contentsSetting.map(ct=>ct.contentName))

            switch (chosenFilter) {
              case "All":
                return prospect.prospectHidden===false
            
              case "Others":
                return ((prospect.prospectHidden===false) && (prospect.notes.some(note=>!contentsSet.has(note.content))))

              default:
                return ((prospect.prospectHidden===false) && (prospect.notes.some(note=>note.content===chosenFilter)))
            }
            
          }).sort((a,b)=>{
            const statusOrderMap = Object.fromEntries(userData.statusSetting.map(st=>[st.statusName,st.statusOrder]))

            const getProspectStatusOrder = (prospect:Prospects):number => {
              if(!prospect.notes || prospect.notes.length===0) return Infinity

              const orders = prospect.notes.map(note=>statusOrderMap[note.status]).filter(order => typeof order === "number")
              return orders.length>0?Math.min(...orders):Infinity
            }

            switch (chosenSort) {

              case "prospectName":
                return a.prospectName.localeCompare(b.prospectName);;
              case "prospectBusiness":
                return a.prospectBusiness.localeCompare(b.prospectBusiness);
              case "statusName":
                const aOrder = getProspectStatusOrder(a)
                const bOrder = getProspectStatusOrder(b)
                return aOrder-bOrder;
              case "oldest":
                return b.id.localeCompare(a.id);

              default:
                return 5;
            }
          }

          ).map((prospectData,index)=>{
            const color = getStatusColorFromProspect(prospectData,userData.statusSetting);

            if(displayStyle==="blockLayout"){
              return <SimpleMediumCard key={index} prospectData={prospectData} color={color} clickFunction={clickedProspectCardHandler}/>
            }else{
              return <NameCardSmallAndFull key={index} prospectData={prospectData} color={color} clickFunctionReceiveProspect={clickedProspectCardHandler}/>
            }
          })}
        </>
        }
      </div>
    </>
  );
}
