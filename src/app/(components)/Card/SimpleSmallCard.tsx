"use client"

import { Notes, Prospects } from "@/lib/dbInterface";
import { FaEdit } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import Styles from "./Card.module.css"
import NormalBtn from "../Btn/NormalBtn";
import AlertBtn from "../Btn/AlartBtn";
import { useEffect, useState } from "react";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";

interface SimpleCardProps {
  prospectData?:Prospects
  noteData?:Notes
  color?:string
  clickFunctionReceiveProspect?:(prospectInfo:Prospects)=>void;
  clickFunctionReceiveNote?:(note:Notes)=>void;
  fullInfo?:boolean;
  clickFunctionEdit?:()=>void;
  clickFunctionHide?:()=>void;
  isEdit?:boolean;
}

export default function SimpleCard({prospectData,noteData,color="#000000",clickFunctionReceiveProspect,clickFunctionReceiveNote,fullInfo=false,clickFunctionEdit,clickFunctionHide,isEdit=false}:SimpleCardProps) {
  const clickedProspectData = useClickedProspectInfoStore((state)=>state.prospect);
  
  const [prospectInfo,setProspectInfo] = useState<Prospects>({
    id:"",
    prospectName:"",
    prospectSex:"Male",
    prospectAge:0,
    prospectMarital:"Single",
    children:0,
    prospectBusiness:"",
    prospectPosition:"",
    prospectLocation:"",
    prospectPhone:"",
    prospectEmail:"",
    prospectHidden:false,
    prospectFirstcontact: new Date(),
    createdAt: new Date(),
    prospectListId:"",
    notes:[],
  })
  const [age,setAge] = useState<number|"">("")
  const [children,setChildren] = useState<number|"">("")

  useEffect(()=>{
    if(clickedProspectData){
      setProspectInfo({
        ...clickedProspectData,
        prospectFirstcontact: new Date(clickedProspectData.prospectFirstcontact),
      })
      setAge(clickedProspectData.prospectAge)
      setChildren(clickedProspectData.children)
    }
  },[clickedProspectData])

  const updateProspectInfo = () => {
    console.log("updateProspectInfo")
  }
  const cancelEdit = () => {
    console.log("cancel Edit")
  }

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
                
                {!isEdit?<>
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
                  <h2 className="[grid-area:positionTitle] text-[#808080]">Position</h2>
                  <h2 className="[grid-area:position]">{prospectData.prospectPosition}</h2>
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
                </>:<>
                  <div className={`[grid-area:spacer] py-[0.5rem] ${Styles.textFont} text-[#808080]`}>Edit Mode</div>
                  <h2 className="[grid-area:nameTitle] text-[#808080]">Name</h2>
                  <input
                    className={`[grid-area:name] grow pl-[1rem] py-[0.5rem]
                      ${Styles.placeholderFont} 
                      ${Styles.inputLayout}
                      ${Styles.marginBtm}`}
                    type="text"
                    placeholder="Full Name"
                    value={prospectInfo.prospectName}
                    onChange={(e) => setProspectInfo({...prospectInfo, prospectName:e.target.value})}
                  />
                  <h2 className="[grid-area:sexTitle] text-[#808080]">Sex</h2>
                  <div className={`[grid-area:sex] flex gap-x-[2rem] grow py-[0.5rem] ${Styles.placeholderFont} ${Styles.marginBtm} ${Styles.marginLeft}`}>
                    <label htmlFor="prospectSex" className="flex gap-[1rem]">
                      <input
                        type="radio"
                        name="prospectSex"
                        value="Male"
                        checked={prospectInfo.prospectSex === "Male"}
                        onChange={(e) =>
                          setProspectInfo({ ...prospectInfo, prospectSex: e.target.value })
                        }
                      />
                      Male
                    </label>
                    <label htmlFor="prospectSex" className="flex gap-[1rem]">
                      <input
                        type="radio"
                        name="prospectSex"
                        value="Female"
                        checked={prospectInfo.prospectSex === "Female"}
                        onChange={(e) =>
                          setProspectInfo({ ...prospectInfo, prospectSex: e.target.value })
                        }
                      />
                      Female
                    </label>
                  </div>
                  <h2 className="[grid-area:ageTitle] text-[#808080]">Age</h2>
                  <input
                    className={`[grid-area:age] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                    type="number"
                    min={0}
                    placeholder='Age'
                    value={age}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "." || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setAge(()=>{
                        if(e.target.value===""){
                          return ""
                        } else{
                          setProspectInfo({...prospectInfo,prospectAge:Number(e.target.value)})
                          return Number(e.target.value)
                        }
                      })
                    }}
                    onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                  />
                  <h2 className="[grid-area:maritalTitle] text-[#808080]">Marital Status</h2>
                  <div className={`[grid-area:marital] flex gap-x-[2rem] grow py-[0.5rem] ${Styles.placeholderFont} ${Styles.marginBtm} ${Styles.marginLeft}`}>
                    <label htmlFor="prospectMarital" className="flex gap-[1rem]">
                      <input
                        type="radio"
                        name="prospectMarital"
                        value="Single"
                        checked={prospectInfo.prospectMarital === "Single"}
                        onChange={(e) =>
                          setProspectInfo({ ...prospectInfo, prospectMarital: e.target.value })
                        }
                      />
                      Single
                    </label>
                    <label htmlFor="prospectMarital" className="flex gap-[1rem]">
                      <input
                        type="radio"
                        name="prospectMarital"
                        value="Married"
                        checked={prospectInfo.prospectMarital === "Married"}
                        onChange={(e) =>
                          setProspectInfo({ ...prospectInfo, prospectMarital: e.target.value })
                        }
                      />
                      Married
                    </label>
                  </div>
                  <h2 className="[grid-area:childrenTitle] text-[#808080]">Children</h2>
                  <input
                    className={`[grid-area:children] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                    type="number"
                    min={0}
                    placeholder='how many children?'
                    value={children}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "." || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setChildren(()=>{
                        if(e.target.value===""){
                          return ""
                        } else{
                          setProspectInfo({...prospectInfo,children:Number(e.target.value)})
                          return Number(e.target.value)
                        }
                      })
                    }}
                    onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                  />
                  <h2 className="[grid-area:businessTitle] text-[#808080]">Business Name</h2>
                  <input
                    className={`[grid-area:business] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                    type="text"
                    placeholder='Business Name'
                    value={prospectInfo.prospectBusiness}
                    onChange={(e) => setProspectInfo({...prospectInfo, prospectBusiness:e.target.value})}
                  />
                  <h2 className="[grid-area:positionTitle] text-[#808080]">Position</h2>
                  <input
                    className={`[grid-area:position] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                    type="text"
                    placeholder='Position'
                    value={prospectInfo.prospectPosition}
                    onChange={(e) => setProspectInfo({...prospectInfo, prospectPosition:e.target.value})}
                  />
                  <h2 className="[grid-area:locationTitle] text-[#808080]">Location</h2>
                  <input
                    className={`[grid-area:location] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                    type="text"
                    placeholder='Location'
                    value={prospectInfo.prospectLocation}
                    onChange={(e) => setProspectInfo({...prospectInfo, prospectLocation:e.target.value})}
                  />
                  <h2 className="[grid-area:phoneTitle] text-[#808080]">Phone</h2>
                  <input
                    className={`[grid-area:phone] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                    type="text"
                    placeholder='Phone'
                    value={prospectInfo.prospectPhone}
                    onChange={(e) => setProspectInfo({...prospectInfo, prospectPhone:e.target.value})}
                  />
                  <h2 className="[grid-area:emailTitle] text-[#808080]">Email</h2>
                  <input
                    className={`[grid-area:email] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                    type="email"
                    placeholder='Email'
                    value={prospectInfo.prospectEmail}
                    onChange={(e) => setProspectInfo({...prospectInfo, prospectEmail:e.target.value})}
                  />
                  <h2 className="[grid-area:firstContactTitle] text-[#808080]">First Contact Date</h2>
                  <input
                    className={`[grid-area:firstContact] grow px-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                    type="date"
                    value={prospectInfo.prospectFirstcontact.toISOString().split("T")[0]}
                    onChange={(e)=> setProspectInfo({...prospectInfo,prospectFirstcontact:new Date(e.target.value)})}
                  />
                  <div className="[grid-area:save] w-full pt-[1rem] flex justify-around">
                    <NormalBtn text="Save" clickFunction={updateProspectInfo}/>
                    <AlertBtn text="Cancel" clickFunction={cancelEdit}/>
                  </div>
                </>}
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
{/*           <h2>{noteData.noteTitle}</h2> */}
          <h2>{noteData.content}</h2>
        </div>
      }
    </div>
  );
}