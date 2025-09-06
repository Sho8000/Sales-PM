"use client"

import { createContext, useContext, useState } from "react";

type AddNewState = {
  isAddNewPage:boolean;
  isEdit:boolean;
  isOpenMemo:string[];
  changeAddNewPageStatus:(value:boolean)=>void;
  changeIsEditStatus:(value:boolean)=>void;
  changeIsOpenMemoList:(value:string)=>void;
}

const AddNewContext = createContext<AddNewState | undefined>(undefined);

const AddNewContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isAddNewPage,setIsAddNewPage] = useState(false)
  const [isEdit,setIsEdit] = useState(false)
  const [isOpenMemo,setIsOpenMemo] = useState<string[]>([]);

  const changeAddNewPageStatus = (value:boolean)=>{
    setIsAddNewPage(value)
  }
  const changeIsEditStatus = (value:boolean)=>{
    setIsEdit(value)
  }
  const changeIsOpenMemoList = (value:string)=>{
    if(!isOpenMemo.includes(value)){
      setIsOpenMemo(prev => [...prev,value])
    } else{
      const index = isOpenMemo.indexOf(value)
      setIsOpenMemo(current => current.filter(id => id != isOpenMemo[index]))
    }
  }

  const value = {isAddNewPage, isEdit, isOpenMemo, changeAddNewPageStatus, changeIsEditStatus, changeIsOpenMemoList}

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