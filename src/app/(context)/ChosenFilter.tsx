"use client"

import { createContext, useContext, useState } from "react";

interface FilterState{
  chosenFilter:string;
  changeChosenFilterStatus:(value:string)=>void;
}

const FilterContext = createContext<FilterState | undefined>(undefined);

const FilterContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [chosenFilter,setChosenFilter] = useState<string>("All");

  const changeChosenFilterStatus = (value:string)=>{
    setChosenFilter(value)
  }

  const value = {chosenFilter, changeChosenFilterStatus}

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

const useFilterContext = ():FilterState => {
  const context = useContext(FilterContext);
  if(!context){
    throw new Error("useFilterContex must be used within a FilterContextProvider");
  }
  return context;
}

export {FilterContextProvider, useFilterContext}