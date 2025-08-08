//import DropDown from "../DropDown/DropdonwList";
import Image from "next/image";
import ColorPallet from "@/../public/ProspectsList/colorPallet.png"
import ListLayout from "@/../public/ProspectsList/listLayout.png"
import BlockLayout from "@/../public/ProspectsList/blockLayout.png"
import { useUserInfoStore } from "@/store/userInfoStore";
import { getStatusColorFromProspect } from "@/lib/findStatusColor";
import SimpleCard from "../Card/SimpleSmallCard";

import Styles from "./prospectsList.module.css"
import { useState } from "react";
import SimpleMediumCard from "../Card/SimpleMediumCard";
import DropDown from "../DropDown/DropdownList";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import { Prospects } from "@/lib/dbInterface";
import { useRouter } from "next/navigation";

export default function FilterAndDisplayArea() {
  const router = useRouter(); 
  const [displayStyle,setDisplayStyle] = useState<"listLayout"|"blockLayout">("listLayout")

  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const setClickedProspectData = useClickedProspectInfoStore((state) => state.setProspect);

  const [selectedFilter,setSlectedFilter] = useState("0")
  const [selectedSort,setSlectedSort] = useState("0")

  const selectedFilterValue = (selectedValue: string) => {
    setSlectedFilter(selectedValue);
    console.log("Selected filter", selectedValue);
  };
  
  const selectedSortValue = (selectedValue: string) => {
    setSlectedSort(selectedValue);
    console.log("Selected sort", selectedValue);
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
          <DropDown filter="Filter" value={selectedFilter} onChange={selectedFilterValue}/>
          <DropDown filter="Sort" value={selectedSort} onChange={selectedSortValue}/>
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
          {userData?.prospectList?.prospects.map((prospectData,index)=>{
            const color = getStatusColorFromProspect(prospectData,userData.statusSetting);

            if(displayStyle==="blockLayout"){
              return <SimpleMediumCard key={index} prospectData={prospectData} color={color} onClick={clickedProspectCardHandler}/>
            }else{
              return <SimpleCard key={index} prospectData={prospectData} color={color} onClickProspect={clickedProspectCardHandler}/>
            }
          })}
        </>
        }
      </div>
    </>
  );
}
