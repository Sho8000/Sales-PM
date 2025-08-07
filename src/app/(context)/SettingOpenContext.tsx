"use client"

import { createContext, useContext, useState } from "react";

type SettingPageState = {
  isSettingPage:boolean;
  isSettingMenu:boolean;
  isSettingStatusPage:boolean;
  isSettingContent:boolean;
  isSettingHidden:boolean;
  isSettingPassword:boolean;
  changeSettingPageStatus:(value:boolean)=>void;
  changeSettingMenuStatus:(value:boolean)=>void;
  changeSettingStatusPageStatus:(value:boolean)=>void;
  changeSettingContentStatus:(value:boolean)=>void;
  changeSettingHiddenStatus:(value:boolean)=>void;
  changeSettingPasswordStatus:(value:boolean)=>void;
}

const SettingPageContext = createContext<SettingPageState | undefined>(undefined);

const SettingPageContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isSettingPage,setIsSettingPage] = useState(false)
  const [isSettingMenu,setIsSettingMenu] = useState(false)
  const [isSettingStatusPage,setIsSettingStatusPage] = useState(false)
  const [isSettingContent,setIsSettingContent] = useState(false)
  const [isSettingHidden,setIsSettingHidden] = useState(false)
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
  const changeSettingContentStatus = (value:boolean)=>{
    setIsSettingContent(value)
  }
  const changeSettingHiddenStatus = (value:boolean)=>{
    setIsSettingHidden(value)
  }
  const changeSettingPasswordStatus = (value:boolean)=>{
    setIsSettingPassword(value)
  }

  const value = {isSettingPage, isSettingMenu, isSettingStatusPage, isSettingContent, isSettingHidden, isSettingPassword, changeSettingPageStatus, changeSettingMenuStatus, changeSettingStatusPageStatus, changeSettingContentStatus, changeSettingHiddenStatus, changeSettingPasswordStatus}

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