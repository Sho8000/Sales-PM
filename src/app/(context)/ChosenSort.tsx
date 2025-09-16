"use client"

import { createContext, useContext, useState } from "react";

interface SortState{
  chosenSort:string;
  changeChosenSortStatus:(value:string)=>void;
}

const SortContext = createContext<SortState | undefined>(undefined);

const SortContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [chosenSort,setChosenSort] = useState<string>("Latest");

  const changeChosenSortStatus = (value:string)=>{
    setChosenSort(value)
  }

  const value = {chosenSort, changeChosenSortStatus}

  return (
    <SortContext.Provider value={value}>
      {children}
    </SortContext.Provider>
  )
}

const useSortContext = ():SortState => {
  const context = useContext(SortContext);
  if(!context){
    throw new Error("useSortContex must be used within a SortContextProvider");
  }
  return context;
}

export {SortContextProvider, useSortContext}