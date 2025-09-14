"use client"

import { Prospects } from "@/lib/dbInterface";
import { createContext, useContext, useState } from "react";

type TempolaryUserDataState = {
  toHiddenProspect:Prospects|null;
  changeToHiddenProspectState:(value:Prospects|null)=>void;
}

const TempolaryUserDataContext = createContext<TempolaryUserDataState | undefined>(undefined);

const TempolaryUserDataContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [toHiddenProspect,setToHiddenProspect] = useState<Prospects|null>(null)

  const changeToHiddenProspectState = (value:Prospects|null)=>{
    setToHiddenProspect(value)
  }

  const value = {toHiddenProspect,changeToHiddenProspectState}

  return (
    <TempolaryUserDataContext.Provider value={value}>
      {children}
    </TempolaryUserDataContext.Provider>
  )
}

const useTempolaryUserDataContext = ():TempolaryUserDataState => {
  const context = useContext(TempolaryUserDataContext);
  if(!context){
    throw new Error("useTempolaryUserDataContext must be used within a TempolaryUserDataContextProvider");
  }
  return context;
}

export {TempolaryUserDataContextProvider, useTempolaryUserDataContext}