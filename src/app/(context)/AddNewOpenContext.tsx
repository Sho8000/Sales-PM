"use client"

import { Notes } from "@/lib/dbInterface";
import { createContext, useContext, useState } from "react";

type AddNewState = {
  isAddNewPage:boolean;
  isEdit:boolean;
  isOpenMemo:{
    id:string,
    isOpen:boolean
  }[];
  isNoteEdit:string|null;
  isAddNewMemoPage:Notes|null;
  changeAddNewPageStatus:(value:boolean)=>void;
  changeIsEditStatus:(value:boolean)=>void;
  changeIsOpenMemoList:(value:string)=>void;
  changeIsNoteEditStatus:(value:string|null)=>void;
  changeAddNewMemoPageStatus:(value:Notes|null)=>void;
}

const AddNewContext = createContext<AddNewState | undefined>(undefined);

const AddNewContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isAddNewPage,setIsAddNewPage] = useState(false)
  const [isEdit,setIsEdit] = useState(false)
  const [isOpenMemo,setIsOpenMemo] = useState<AddNewState["isOpenMemo"]>([]);
  const [isNoteEdit,setIsNoteEdit] = useState<string|null>(null)
  const [isAddNewMemoPage,setIsAddNewMemoPage] = useState<Notes|null>(null)

  const changeAddNewPageStatus = (value:boolean)=>{
    setIsAddNewPage(value)
  }
  const changeIsEditStatus = (value:boolean)=>{
    setIsEdit(value)
  }
  const changeIsOpenMemoList = (value:string)=>{
    setIsOpenMemo(prev => {
      const index = prev.findIndex(memo=>memo.id===value)

      if(index === -1){
        return [...prev,{id:value,isOpen:true}]
      } else {
        if(prev[index].id===isNoteEdit){
          return prev
        }
        const updated = [...prev]
        updated[index] = {
          ...updated[index],
          isOpen:!updated[index].isOpen          
        }
        return updated
      }
    })
  }
  const changeIsNoteEditStatus = (value:string|null)=>{
    setIsNoteEdit(value)
  }
  const changeAddNewMemoPageStatus = (value:Notes|null)=>{
    setIsAddNewMemoPage(value)
  }

  const value = {isAddNewPage, isEdit, isOpenMemo, isNoteEdit, isAddNewMemoPage, changeAddNewPageStatus, changeIsEditStatus, changeIsOpenMemoList, changeIsNoteEditStatus, changeAddNewMemoPageStatus}

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