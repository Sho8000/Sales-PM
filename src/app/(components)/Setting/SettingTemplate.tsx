"use client"

import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";
import SectionTitle from "../CommonParts/SectionTitle";
import SettingMenu from "./SettingMenu";
import CloseBtn from "../Btn/CloseBtn";

import Styles from "./Setting.module.css"

interface SettingProps{
  title:string;
}

export default function SettingTemplate({title}:SettingProps) {
  const {isSettingPage,changeSettingPageStatus} = useSettingPageContext();

  const closeBtnHandler = () => {
    changeSettingPageStatus(false)
  }

  return (
    <>
      {isSettingPage && 
        <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
          <div className={`relative top-[50%] left-[50%] translate-[-50%] rounded-[10px] py-[1rem] bg-[#fdfdfd]
            ${Styles.whiteBox}  
          `}>
            <SectionTitle text={title}/>
            <div className={`absolute top-0 right-0 translate-y-[-50%] translate-x-[50%]`}>
              <CloseBtn clickFunction={closeBtnHandler}/>
            </div>

            {/* each Menu area */}
            <SettingMenu/>
          </div>
        </div>
      }
    </>
  );
}
