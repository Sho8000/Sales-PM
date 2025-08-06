//import DropDown from "../DropDown/DropdonwList";
import Image from "next/image";
import ColorPallet from "@/../public/ProspectsList/colorPallet.png"
import ListLayout from "@/../public/ProspectsList/listLayout.png"
import BlockLayout from "@/../public/ProspectsList/blockLayout.png"
import { useUserInfoStore } from "@/store/userInfoStore";
import { getStatusColorFromProspect } from "@/lib/findStatusColor";
import SimpleCard from "../Card/SimpleSmallCard";

import Styles from "./prospectsList.module.css"

export default function FilterAndDisplayArea() {
//  const setUser = useUserInfoStore((state)=>state.setUser);
  const userData = useUserInfoStore((state) => state.user); //use user's all Information

  const colorPalletClickHandler = () => {
    console.log("ColorPallet")
  }
  const listLayoutClickHandler = () => {
    console.log("ListLayout")
  }
  const blockLayoutClickHandler = () => {
    console.log("BlockLayout")
  }

  return (
    <>
      {/* Filter and DisplayOption */}
      <div className={`flex justify-between ${Styles.filterDisplayLayout} ${Styles.flexCol} m-auto`}>
        <div className={`flex gap-[1rem] items-center ${Styles.flexCol}`}>
          <h1>dropdown</h1>
          <h1>dropdown</h1>
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

      {/* Gap Bar */}
      <div className={`h-[2px] bg-gray-300 ${Styles.filterDisplayLayout} m-auto`}></div>

      {/* Display ListStyle*/}
      <div className="max-h-[70vh] overflow-y-scroll flex flex-col gap-[1rem]">
        {userData?.prospectList?.prospects.map((prospectData,index)=>{
          const color = getStatusColorFromProspect(prospectData,userData.statusSetting);

          return <SimpleCard key={index} prospectData={prospectData} color={color}/>
        })}
      </div>

    </>
  );
}
