"use client"

import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";
import SectionTitle from "../CommonParts/SectionTitle";
import SettingMenu from "./SettingMenu";
import CloseBtn from "../Btn/CloseBtn";

import Styles from "./Setting.module.css"
import SettingStatusAndColor from "./SettingStatusAndColor";
import { useEffect, useState } from "react";
import { ContentsSetting, StatusSetting } from "@/lib/dbInterface";
import { useUserInfoStore } from "@/store/userInfoStore";
import SettingContents from "./SettingContents";
import SettingPassword from "./SettingPassword";
import AlertCard from "../Card/AlertCard";
import AlertBtn from "../Btn/AlartBtn";
import AddNewStatusAndColor from "../Card/AddNewStatus";
import SettingHidden from "./SettingHidden";

interface SettingProps{
  title:string;
}

export default function SettingTemplate({title}:SettingProps) {
  const {isSettingPage,isSettingMenu,isSettingStatusPage,isSettingStatusNewPage,isSettingContent,isSettingContentNew,isSettingHidden,isSettingRemoveHidden,isProspectDelete,isStatusDelete,isContentDelete,isSettingPassword, changeSettingPageStatus,changeSettingMenuStatus,changeSettingStatusPageStatus,changeSettingStatusPageNewStatus,changeSettingContentStatus,changeSettingContentNewStatus,changeSettingHiddenStatus,changeSettingRemoveHiddenStatus,changeProspectDeleteStatus,changeStatusDeleteStatus,changeContentDeleteStatus,changeSettingPasswordStatus} = useSettingPageContext();

  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const userReloadKey = useUserInfoStore((state)=>state.reloadKey);
  const [settingData,setSettingData] = useState<StatusSetting[]|null>(null);
  const [contentsSetting,setContentsSetting] = useState<ContentsSetting[]|null>(null);
  const userDataReload = useUserInfoStore((state) => state.reload);

  useEffect(()=>{
    /* For StatusSetting */
    if(userData?.statusSetting){
      const sortedSettings = [...userData.statusSetting].sort((a, b) => a.statusOrder - b.statusOrder);
      setSettingData(sortedSettings);
    }

    /* For ContentsSetting */
    if(userData?.contentsSetting){
      setContentsSetting(userData.contentsSetting)
    }

  },[userData,userReloadKey])

  const closeBtnHandler = () => {
    changeSettingPageStatus(false)
    changeSettingMenuStatus(false)
    changeSettingStatusPageStatus(false)
    changeSettingContentStatus(false)
    changeSettingHiddenStatus(false)
    changeSettingPasswordStatus(false)
    changeSettingStatusPageNewStatus(false)
    changeSettingContentNewStatus(false)
    changeSettingHiddenStatus(false)
  }

  const clickStatusDeleteHandler = async(statusId:string) => {
    if(!userData)return
    try{
      const res = await fetch(`/api/settings/status/${userData.id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusId:statusId
        })
      })

      if (!res.ok){
        console.log("Error !!!")
        return null;
      };

      userDataReload();
    }  catch (error) {
      console.error("Error fetching delete Status info requests:", error);
      return null
    }
  }

  const clickContentDeleteHandler = async(contentId:string) => {
    if(!userData)return
    try{
      const res = await fetch(`/api/settings/contents/${userData.id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId:contentId
        })
      })

      if (!res.ok){
        console.log("Error !!!")
        return null;
      };

      userDataReload();

    }  catch (error) {
      console.error("Error fetching delete Contents info requests:", error);
      return null
    }
  }

  const clickRemoveFromHiddenHandler = async() => {
    try{
      if(isSettingRemoveHidden?.id){
        const res = await fetch(`/api/prospectList/${isSettingRemoveHidden.id}`,{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prospectInfo:{...isSettingRemoveHidden,prospectHidden:false}
          })
        })

        if (!res.ok){
          console.log("Error !!!")
          return null;
        };

      }

      userDataReload();
      changeSettingRemoveHiddenStatus(null)
    } catch (error) {
      console.error("Error fetching update Prospect info requests:", error);
      return null
    }
  }
  const clickProspectDeleteHandeler = async() => {
    try{
      if(isProspectDelete?.id){
        const res = await fetch(`/api/prospectList/${isProspectDelete.id}`,{
          method:'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prospectInfo:{...isSettingRemoveHidden,prospectHidden:false}
          })
        })

        if (!res.ok){
          console.log("Error !!!")
          return null;
        };

      }

      userDataReload();
      changeSettingRemoveHiddenStatus(null)
    } catch (error) {
      console.error("Error fetching update Prospect info requests:", error);
      return null
    }
    changeProspectDeleteStatus(null)
  }


  return (
    <>
      {isSettingPage && 
        <>
          <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
            <div className={`absolute top-0 right-0 translate-y-[50%] translate-x-[-30%] z-50`}>
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
                <SettingHidden/>
              }
              {isSettingPassword &&
                <SettingPassword/>
              }
            </div>
          </div>

          {isStatusDelete &&
          <div className="fixed z-50">
            <AlertCard
              text={`Do you want to delete "${isStatusDelete.statusName}"?`}
              button1={<AlertBtn text="Delete" clickFunction={()=>{
                clickStatusDeleteHandler(isStatusDelete.id);
                changeStatusDeleteStatus(null);
              }}/>}
              button2={<AlertBtn text="Cancel" clickFunction={()=>changeStatusDeleteStatus(null)}/>}
            />
          </div>}

          {isContentDelete &&
          <div className="fixed z-50">
            <AlertCard
              text={`Do you want to delete "${isContentDelete.contentName}"?`}
              button1={<AlertBtn text="Delete" clickFunction={()=>{
                clickContentDeleteHandler(isContentDelete.id);
                changeContentDeleteStatus(null);
              }}/>}
              button2={<AlertBtn text="Cancel" clickFunction={()=>changeContentDeleteStatus(null)}/>}
            />
          </div>
          }
          
          {isSettingStatusNewPage &&
            <AddNewStatusAndColor text="New Status&Color"/>
          }

          {isSettingContentNew &&
            <AddNewStatusAndColor text="New Content"/>
          }

          {isSettingRemoveHidden &&
            <div className="fixed z-50">
              <AlertCard
                text={`Do you want to move "${isSettingRemoveHidden.prospectName}" to your prospect list?`}
                button1={<AlertBtn text="OK"
                  oppositColor={true}
                  clickFunction={
                  clickRemoveFromHiddenHandler
                }/>}
                button2={<AlertBtn text="Cancel" oppositColor={true} clickFunction={()=>changeSettingRemoveHiddenStatus(null)}/>}
              />
            </div>
          }

          {isProspectDelete &&
            <div className="fixed z-50">
              <AlertCard
                text={`Do you want to delete "${isProspectDelete.prospectName}" information from this App?`}
                button1={<AlertBtn text="Delete"
                  clickFunction={
                  clickProspectDeleteHandeler
                }/>}
                button2={<AlertBtn text="Cancel" clickFunction={()=>changeProspectDeleteStatus(null)}/>}
              />
            </div>
          }
        </>
      }
    </>
  );
}
