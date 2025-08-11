"use client"

import { createContext, useContext, useState } from "react";

type AddNewState = {
  isAddNewPage:boolean;
  changeAddNewPageStatus:(value:boolean)=>void;
}

const AddNewContext = createContext<AddNewState | undefined>(undefined);

const AddNewContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isAddNewPage,setIsAddNewPage] = useState(false)

  const changeAddNewPageStatus = (value:boolean)=>{
    setIsAddNewPage(value)
  }

  const value = {isAddNewPage, changeAddNewPageStatus}

  return (
    <AddNewContext.Provider value={value}>
      {children}
    </AddNewContext.Provider>
  )
}

const useAddNewContext = ():AddNewState => {
  const context = useContext(AddNewContext);
  if(!context){
    throw new Error("useAddNewContex must be used within a AddNewContextProvider");
  }
  return context;
}

export {AddNewContextProvider, useAddNewContext}