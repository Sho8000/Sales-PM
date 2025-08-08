"use client"

import { Notes, Prospects } from "@/lib/dbInterface";
import Styles from "./Card.module.css"

interface SimpleCardProps {
  prospectData?:Prospects
  noteData?:Notes
  color?:string
  onClickProspect?:(prospectInfo:Prospects)=>void;
}

export default function SimpleCard({prospectData,noteData,color="#000000",onClickProspect}:SimpleCardProps) {

  return (
    <div className={`relative flex items-center w-[90%] m-auto rounded-[10px] bg-white ${Styles.smallCardComponent}`}>
      <div className={`absolute w-[20px] h-full rounded-l-[10px] left-[-1px]`} style={{backgroundColor:color}}></div>
      
      {prospectData &&
        <div className={`flex w-full h-full justify-between items-center ${Styles.cardFont} font-bold`} 
        onClick={()=>{
          if(onClickProspect){
            onClickProspect(prospectData)
          }
        }}
      >
          <div className={`flex justify-between items-center basis-1/2 gap-x-[2rem] ${Styles.smallCardComponentLeft}`}>
            <h2>{prospectData.prospectName}</h2>
            <h2>{prospectData.prospectSex==="Male"?"M":"F"}</h2>
          </div>
          <h2>{prospectData.prospectBusiness}</h2>
        </div>
      }
      {noteData &&
        <div className={`flex w-full h-full justify-between items-center ${Styles.cardFont} font-bold`}>
          <h2>{noteData.noteTitle}</h2>
          <h2>{noteData.content}</h2>
        </div>
      }
    </div>
  );
}