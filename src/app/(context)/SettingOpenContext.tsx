"use client"

import { createContext, useContext, useState } from "react";

type SettingPageState = {
  isSettingPage:boolean;
  changeSettingPageStatus:(value:boolean)=>void;
}

const SettingPageContext = createContext<SettingPageState | undefined>(undefined);

const SettingPageContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isSettingPage,setIsSettingPage] = useState(false)

  const changeSettingPageStatus = (value:boolean)=>{
    setIsSettingPage(value)
  }

  const value = {isSettingPage, changeSettingPageStatus}

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