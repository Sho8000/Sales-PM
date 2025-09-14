"use client"

import { ContentsSetting, Prospects, StatusSetting } from "@/lib/dbInterface";
import { createContext, useContext, useState } from "react";

type SettingPageState = {
  isSettingPage:boolean;
  isSettingMenu:boolean;
  isSettingStatusPage:boolean;
  isSettingStatusNewPage:boolean;
  isSettingContent:boolean;
  isSettingContentNew:boolean;
  isSettingHidden:boolean;
  isSettingRemoveHidden:Prospects|null;
  isProspectDelete:Prospects|null;
  isStatusDelete:StatusSetting|null;
  isContentDelete:ContentsSetting|null;
  isSettingPassword:boolean;
  changeSettingPageStatus:(value:boolean)=>void;
  changeSettingMenuStatus:(value:boolean)=>void;
  changeSettingStatusPageStatus:(value:boolean)=>void;
  changeSettingStatusPageNewStatus:(value:boolean)=>void;
  changeSettingContentStatus:(value:boolean)=>void;
  changeSettingContentNewStatus:(value:boolean)=>void;
  changeSettingHiddenStatus:(value:boolean)=>void;
  changeSettingRemoveHiddenStatus:(value:Prospects|null)=>void;
  changeProspectDeleteStatus:(value:Prospects|null)=>void;
  changeStatusDeleteStatus:(value:StatusSetting|null)=>void;
  changeContentDeleteStatus:(value:ContentsSetting|null)=>void;
  changeSettingPasswordStatus:(value:boolean)=>void;
}

const SettingPageContext = createContext<SettingPageState | undefined>(undefined);

const SettingPageContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isSettingPage,setIsSettingPage] = useState(false)
  const [isSettingMenu,setIsSettingMenu] = useState(false)
  const [isSettingStatusPage,setIsSettingStatusPage] = useState(false)
  const [isSettingStatusNewPage,setIsSettingStatusNewPage] = useState(false)
  const [isSettingContent,setIsSettingContent] = useState(false)
  const [isSettingContentNew,setIsSettingContentNew] = useState(false)
  const [isSettingHidden,setIsSettingHidden] = useState(false)
  const [isSettingRemoveHidden,setIsSettingRemoveHidden] = useState<Prospects|null>(null)
  const [isProspectDelete,setIsProspectDelete] = useState<Prospects|null>(null)
  const [isStatusDelete,setIsStatusDelete] = useState<StatusSetting|null>(null)
  const [isContentDelete,setIsContentDelete] = useState<ContentsSetting|null>(null)
  const [isSettingPassword,setIsSettingPassword] = useState(false)

  const changeSettingPageStatus = (value:boolean)=>{
    setIsSettingPage(value)
  }
  const changeSettingMenuStatus = (value:boolean)=>{
    setIsSettingMenu(value)
  }
  const changeSettingStatusPageStatus = (value:boolean)=>{
    setIsSettingStatusPage(value)
  }
  const changeSettingStatusPageNewStatus = (value:boolean)=>{
    setIsSettingStatusNewPage(value)
  }
  const changeSettingContentStatus = (value:boolean)=>{
    setIsSettingContent(value)
  }
  const changeSettingContentNewStatus = (value:boolean)=>{
    setIsSettingContentNew(value)
  }
  const changeSettingHiddenStatus = (value:boolean)=>{
    setIsSettingHidden(value)
  }
  const changeSettingRemoveHiddenStatus = (value:Prospects|null)=>{
    setIsSettingRemoveHidden(value)
  }
  const changeProspectDeleteStatus = (value:Prospects|null)=>{
    setIsProspectDelete(value)
  }
  const changeStatusDeleteStatus = (value:StatusSetting|null)=>{
    setIsStatusDelete(value)
  }
  const changeContentDeleteStatus = (value:ContentsSetting|null)=>{
    setIsContentDelete(value)
  }
  const changeSettingPasswordStatus = (value:boolean)=>{
    setIsSettingPassword(value)
  }

  const value = {isSettingPage, isSettingMenu, isSettingStatusPage, isSettingStatusNewPage, isSettingContent, isSettingContentNew, isSettingHidden, isSettingRemoveHidden, isProspectDelete, isStatusDelete, isContentDelete, isSettingPassword, changeSettingPageStatus, changeSettingMenuStatus, changeSettingStatusPageStatus, changeSettingStatusPageNewStatus, changeSettingContentStatus, changeSettingContentNewStatus, changeSettingHiddenStatus, changeSettingRemoveHiddenStatus, changeProspectDeleteStatus, changeStatusDeleteStatus, changeContentDeleteStatus, changeSettingPasswordStatus}

  return (
    <SettingPageContext.Provider value={value}>
      {children}
    </SettingPageContext.Provider>
  )
}

const useSettingPageContext = ():SettingPageState => {
  const context = useContext(SettingPageContext);
  if(!context){
    throw new Error("useSettingPageContex must be used within a SettingPageContextProvider");
  }
  return context;
}

export {SettingPageContextProvider, useSettingPageContext}