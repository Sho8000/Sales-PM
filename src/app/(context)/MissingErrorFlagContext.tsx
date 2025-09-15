"use client"

import { createContext, useContext, useState } from "react";

interface MissingErrorFlagState{
  isMissing:string|null;
  changeIsMissingStatus:(value:string|null)=>void;
}

const MissingErrorFlagContext = createContext<MissingErrorFlagState | undefined>(undefined);

const MissingErrorFlagContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isMissing,setIsMissing] = useState<string|null>(null);

  const changeIsMissingStatus = (value:string|null)=>{
    setIsMissing(value)
  }

  const value = {isMissing, changeIsMissingStatus}

  return (
    <MissingErrorFlagContext.Provider value={value}>
      {children}
    </MissingErrorFlagContext.Provider>
  )
}

const useMissingErrorFlagContext = ():MissingErrorFlagState => {
  const context = useContext(MissingErrorFlagContext);
  if(!context){
    throw new Error("useMissingErrorFlagContex must be used within a MissingErrorFlagContextProvider");
  }
  return context;
}

export {MissingErrorFlagContextProvider, useMissingErrorFlagContext}