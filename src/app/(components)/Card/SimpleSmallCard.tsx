"use client"

import { Notes, Prospects } from "@/lib/dbInterface";
import { FaEdit } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import Styles from "./Card.module.css"

interface SimpleCardProps {
  prospectData?:Prospects
  noteData?:Notes
  color?:string
  clickFunctionReceiveProspect?:(prospectInfo:Prospects)=>void;
  clickFunctionReceiveNote?:(note:Notes)=>void;
  fullInfo?:boolean;
  clickFunctionEdit?:()=>void;
  clickFunctionHide?:()=>void;
}

export default function SimpleCard({prospectData,noteData,color="#000000",clickFunctionReceiveProspect,clickFunctionReceiveNote,fullInfo=false,clickFunctionEdit,clickFunctionHide}:SimpleCardProps) {

  return (
    <div className={`relative flex items-center w-[90%] m-auto rounded-[10px] bg-white ${Styles.smallCardComponent}`}>
      <div className={`absolute w-[20px] h-full rounded-l-[10px] left-[-1px]`} style={{backgroundColor:color}}></div>
      
      {prospectData &&
        <div className={`flex w-full h-full justify-between items-center ${Styles.cardFont} font-bold`} 
        onClick={()=>{
          if(clickFunctionReceiveProspect){
            clickFunctionReceiveProspect(prospectData)
          }}}
        >
          {!fullInfo ?
            <>
              <div className={`flex justify-between items-center basis-1/2 gap-x-[2rem] ${Styles.smallCardComponentLeft}`}>
                <h2>{prospectData.prospectName}</h2>
                <h2>{prospectData.prospectSex==="Male"?"M":"F"}</h2>
              </div>
              <h2>{prospectData.prospectBusiness}</h2>
            </>
            :<>
              <div className={`w-full relative ${Styles.fullInfoLayout} break-all`}>
                <div className="absolute flex top-0 right-0 gap-[1rem]">
                  <div className={`${Styles.iconSize}`}
                    onClick={(e)=>{
                      e.stopPropagation();
                      clickFunctionEdit?.();
                    }}
                  >
                    <FaEdit size={"100%"} color="gray"/>
                  </div>
                  <div className={`${Styles.iconSize}`}
                    onClick={(e)=>{
                      e.stopPropagation();
                      clickFunctionHide?.();
                    }}
                  >
                    <IoMdEyeOff size={"100%"} color="gray"/>
                  </div>
                </div>

                <h2 className="[grid-area:nameTitle] text-[#808080]">Name</h2>
                <h2 className="[grid-area:name]">{prospectData.prospectName}</h2>
                <h2 className="[grid-area:sexTitle] text-[#808080]">Sex</h2>
                <h2 className="[grid-area:sex]">{prospectData.prospectSex}</h2>
                <h2 className="[grid-area:ageTitle] text-[#808080]">Age</h2>
                <h2 className="[grid-area:age]">{prospectData.prospectAge}</h2>
                <h2 className="[grid-area:maritalTitle] text-[#808080]">Marital Status</h2>
                <h2 className="[grid-area:marital]">{prospectData.prospectMarital}</h2>
                <h2 className="[grid-area:childrenTitle] text-[#808080]">Children</h2>
                <h2 className="[grid-area:children]">{prospectData.children}</h2>
                <h2 className="[grid-area:businessTitle] text-[#808080]">Business Name</h2>
                <h2 className="[grid-area:business]">{prospectData.prospectBusiness}</h2>
                <h2 className="[grid-area:locationTitle] text-[#808080]">Location</h2>
                <h2 className="[grid-area:location]">{prospectData.prospectLocation}</h2>
                <h2 className="[grid-area:phoneTitle] text-[#808080]">Phone</h2>
                <h2 className="[grid-area:phone]">{prospectData.prospectPhone}</h2>
                <h2 className="[grid-area:emailTitle] text-[#808080]">Email</h2>
                <h2 className="[grid-area:email]">{prospectData.prospectEmail}</h2>
                <h2 className="[grid-area:firstContactTitle] text-[#808080]">First Contact Date</h2>
                <h2 className="[grid-area:firstContact]">{new Date(prospectData.prospectFirstcontact).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}</h2>
              </div>
            </>
          }
        </div>
      }
      {noteData &&
        <div className={`flex w-full h-full justify-between items-center gap-[2rem  ] ${Styles.cardFont} font-bold`}
        onClick={()=>{
          if(clickFunctionReceiveNote){
            clickFunctionReceiveNote(noteData)
          }
        }}
        >
          <h2>{noteData.noteTitle}</h2>
          <h2>{noteData.content}</h2>
        </div>
      }
    </div>
  );
}