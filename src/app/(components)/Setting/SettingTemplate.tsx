"use client"

import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";
import SectionTitle from "../CommonParts/SectionTitle";
import SettingMenu from "./SettingMenu";
import CloseBtn from "../Btn/CloseBtn";
//import { MdDelete } from "react-icons/md";
//import { FaEdit } from "react-icons/fa";
//import { IoIosAdd } from "react-icons/io";
//import { IoMdEye } from "react-icons/io";
//import { IoMdEyeOff } from "react-icons/io";

import Styles from "./Setting.module.css"
import SettingStatusAndColor from "./SettingStatusAndColor";
import { useEffect, useState } from "react";
import { ContentsSetting, StatusSetting } from "@/lib/dbInterface";
import { useUserInfoStore } from "@/store/userInfoStore";
import SettingContents from "./SettingContents";

interface SettingProps{
  title:string;
}

export default function SettingTemplate({title}:SettingProps) {
  const {isSettingPage,isSettingMenu,isSettingStatusPage,isSettingContent, isSettingHidden,isSettingPassword, changeSettingPageStatus,changeSettingMenuStatus,changeSettingStatusPageStatus,changeSettingContentStatus,changeSettingHiddenStatus,changeSettingPasswordStatus} = useSettingPageContext();

  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const [settingData,setSettingData] = useState<StatusSetting[]|null>(null);
  const [contentsSetting,setContentsSetting] = useState<ContentsSetting[]|null>(null);

  useEffect(()=>{
    /* For StatusSetting */
    if(userData?.statusSetting){
      const sortedSettings = [...userData.statusSetting].sort((a, b) => a.statusOrder - b.statusOrder);
      setSettingData(sortedSettings);
//      setStatusOderData(sortedSettings[sortedSettings.length-1].statusOrder+1)
    }

    /* For ContentsSetting */
    if(userData?.contentsSetting){
      setContentsSetting(userData.contentsSetting)
    }

    },[userData])


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
          <div className={`relative max-h-[90vh] overflow-y-auto top-[50%] left-[50%] translate-[-50%] rounded-[10px] py-[1rem] bg-[#fdfdfd]
            ${Styles.whiteBox}  
          `}>
            <SectionTitle text={title}/>

            {/* each Menu area */}
            {isSettingMenu &&
              <SettingMenu/>
            }
            {isSettingStatusPage &&
              <>
                {settingData &&
                  <SettingStatusAndColor settingData={settingData}/>
                }
              </>
            }
            {isSettingContent &&
              <>
                {contentsSetting &&
                  <SettingContents contentsData={contentsSetting}/>
                }
              </>
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
