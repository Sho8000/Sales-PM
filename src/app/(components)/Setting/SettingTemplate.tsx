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
  const {isSettingPage,isSettingMenu,isSettingStatusPage,isSettingContent, isSettingHidden,isSettingPassword, changeSettingPageStatus,changeSettingMenuStatus,changeSettingStatusPageStatus,changeSettingContentStatus,changeSettingHiddenStatus,changeSettingPasswordStatus} = useSettingPageContext();

  const closeBtnHandler = () => {
    changeSettingPageStatus(false)
    changeSettingMenuStatus(false)
    changeSettingStatusPageStatus(false)
    changeSettingContentStatus(false)
    changeSettingHiddenStatus(false)
    changeSettingPasswordStatus(false)
  }

  return (
    <>
      {isSettingPage && 
        <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
          <div className={`absolute top-0 right-0 translate-y-[50%] translate-x-[-10%] z-50`}>
            <CloseBtn clickFunction={closeBtnHandler}/>
          </div>
          <div className={`relative top-[50%] left-[50%] translate-[-50%] rounded-[10px] py-[1rem] bg-[#fdfdfd]
            ${Styles.whiteBox}  
          `}>
            <SectionTitle text={title}/>

            {/* each Menu area */}
            {isSettingMenu &&
              <SettingMenu/>
            }
            {isSettingStatusPage &&
              <h1>Setting Status</h1>
            }
            {isSettingContent &&
              <h1>Setting Content</h1>
            }
            {isSettingHidden &&
              <h1>Setting Hidden</h1>
            }
            {isSettingPassword &&
              <h1>Setting Password</h1>
            }
          </div>
        </div>
      }
    </>
  );
}
