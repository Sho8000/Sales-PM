"use client"

import { useState } from "react";
import NormalBtn from "../Btn/NormalBtn";
import Styles from "./Card.module.css"
import StylesSetting from "../Setting/Setting.module.css"
import { ContentsSetting, StatusSetting } from "@/lib/dbInterface";
import CloseBtn from "../Btn/CloseBtn";
import SectionTitle from "../CommonParts/SectionTitle";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";

interface AddNewStatusProps {
  text:"New Status&Color"|"New Content";
}
export default function AddNewStatusAndColor({text}:AddNewStatusProps) {
  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const userDataReload = useUserInfoStore((state) => state.reload);
  const {changeSettingStatusPageNewStatus,changeSettingContentNewStatus} = useSettingPageContext();
  const [newStatusInfo,setNewStatusInfo] = useState<StatusSetting>({
    id:"",
    statusName:"",
    statusColor:"#000000",
    statusOrder: 0,
    userId:"",
  })
  const [newContentInfo,setNewContentInfo] = useState<ContentsSetting>({
    id:"",
    contentName:"",
    userId:""
  })
  const [openColorPicker,setOpenColorPicker] = useState("#000000")

  const closeBtnHandler = () => {
    changeSettingStatusPageNewStatus(false)
    changeSettingContentNewStatus(false)
  }

  const clickeSave = async () => {
    if(text==="New Status&Color"){
      console.log(text)
    } else if(text==="New Content"){
      try{
        if(
          newContentInfo.contentName === ""
        ){
          console.log("please add all information")
          return null
        }
  
        if(userData?.prospectList?.id){
          const res = await fetch(`/api/settings/contents/${userData.id}`,{
            method:"POST",
            headers:{
              "content-Type":"application/json",
            },
            body: JSON.stringify({
              newContentInfo:{
                contentName:newContentInfo.contentName
              }
            })
          })
  
          if(!res.ok){
            console.log("Error !!!")
            return null
          }
  
          userDataReload();
          changeSettingContentNewStatus(false);
        }
      } catch (error) {
        console.error("Error fetching post a new note requests:", error);
        return null
      }
    }

    userDataReload();
    changeSettingStatusPageNewStatus(false);
    changeSettingContentNewStatus(false);
  }

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
        <div className={`absolute top-0 right-0 translate-y-[50%] translate-x-[-30%] z-50`}>
          <CloseBtn clickFunction={closeBtnHandler}/>
        </div>
        <div className={`relative max-h-[90vh] overflow-y-auto top-[50%] left-[50%] translate-[-50%] rounded-[10px] py-[1rem] bg-[#fdfdfd]
          ${StylesSetting.whiteBox}  
        `}>

          <SectionTitle text={text}/>
          <div className={`relative w-[90%] m-auto ${Styles.newContentSetting}`}>
            {text==="New Status&Color" && <>
              <h2 className={`text-[#808080] ${Styles.cardFont} font-bold`}>{text} : </h2>
              <div className={`grow flex items-center gap-[1rem] ${Styles.statusSettingMB}`}>
                <input
                  className={`grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout}`}
                  type="text"
                  placeholder='Status Name'
                  value={newStatusInfo.statusName}
                  onChange={(e) => setNewStatusInfo({...newStatusInfo, statusName:e.target.value})}
                />
                {/* Color Input */}
                <div
                  className={`rounded-[5px] ${StylesSetting.colorSizeForAddNew}`}
                  style={{backgroundColor:newStatusInfo.statusColor}}
                  onClick={() => {setOpenColorPicker(newStatusInfo.statusColor)}}
                ></div>
                {openColorPicker}
              </div>
            </>}
            {text==="New Content" && <>
              <h2 className={`text-[#808080] ${Styles.cardFont} font-bold`}>{text} : </h2>
              <input
                className={`grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                type="text"
                placeholder='Content Name'
                value={newContentInfo.contentName}
                onChange={(e) => setNewContentInfo({...newContentInfo, contentName:e.target.value})}
              />
            </>}
          </div>

          <div className="w-[80%] max-w-[500px] flex justify-center p-[1rem] m-auto">
            <NormalBtn text="Save" clickFunction={clickeSave}/>
          </div>

        </div>
      </div>
    </>
  );
}