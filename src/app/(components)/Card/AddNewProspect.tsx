"use client"

import { useState } from "react";
import Styles from "./Card.module.css"
import { Prospects } from "@/lib/dbInterface";
import NormalBtn from "../Btn/NormalBtn";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import { useAddNewContext } from "@/app/(context)/AddNewOpenContext";

export default function AddNewProspectCard() {
  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const setClickedProspectData = useClickedProspectInfoStore((state)=>state.setProspect);
  const reloadClickedProspect = useClickedProspectInfoStore((state) => state.reload);
  const {changeAddNewPageStatus} = useAddNewContext()

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

  const prospectInfoSave = async (): Promise<Prospects | null> => {
    try{
      if(
        prospectInfo.prospectName === ""
        || age === ""
        || children === ""
        || prospectInfo.prospectBusiness === ""
        || prospectInfo.prospectPosition === ""
        || prospectInfo.prospectLocation === ""
        || prospectInfo.prospectPhone === ""
        || prospectInfo.prospectEmail === ""
      ){
        console.log("please add all information")
        return null
      }

      if(userData?.prospectList?.id){
        const res = await fetch(`api/prospectList/${userData.prospectList.id}`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prospectInfo:prospectInfo
          })
        })

        if (!res.ok){
          console.log("Error !!!")
          return null;
        };

        const {data} = await res.json();
        return data;
      }

      return null

    } catch (error) {
      console.error("Error fetching post a new prospect requests:", error);
      return null
    }
  }

  const clickSave = async () => {
    const newProspect = await prospectInfoSave();

    if(newProspect){
      window.location.reload()
    }
  }

  const clickAddNote = async () => {
    const newProspect = await prospectInfoSave();

    if(newProspect){
      setClickedProspectData({...newProspect,notes:[]})

      reloadClickedProspect();
      changeAddNewPageStatus(true)
    }
  }

  return (
    <>
      <div className={`relative ${Styles.fullInfoLayout} break-all`}>

      {/* input prospect information */}
        <h2 className={`[grid-area:nameTitle] text-[#808080] ${Styles.cardFont} font-bold`} onClick={()=>{console.log(prospectInfo)}}>Full Name</h2>
        <input
          className={`[grid-area:name] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="text"
          placeholder='Full Name'
          value={prospectInfo.prospectName}
          onChange={(e) => setProspectInfo({...prospectInfo, prospectName:e.target.value})}
        />
        <h2 className={`[grid-area:sexTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Sex</h2>
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
        <h2 className={`[grid-area:ageTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Age</h2>
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
        <h2 className={`[grid-area:maritalTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Marital Status</h2>
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
        <h2 className={`[grid-area:childrenTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Children</h2>
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
        <h2 className={`[grid-area:businessTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Business Name</h2>
        <input
          className={`[grid-area:business] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="text"
          placeholder='Business Name'
          value={prospectInfo.prospectBusiness}
          onChange={(e) => setProspectInfo({...prospectInfo, prospectBusiness:e.target.value})}
        />
        <h2 className={`[grid-area:positionTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Position</h2>
        <input
          className={`[grid-area:position] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="text"
          placeholder='Position'
          value={prospectInfo.prospectPosition}
          onChange={(e) => setProspectInfo({...prospectInfo, prospectPosition:e.target.value})}
        />
        <h2 className={`[grid-area:locationTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Location</h2>
        <input
          className={`[grid-area:location] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="text"
          placeholder='Location'
          value={prospectInfo.prospectLocation}
          onChange={(e) => setProspectInfo({...prospectInfo, prospectLocation:e.target.value})}
        />
        <h2 className={`[grid-area:phoneTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Phone</h2>
        <input
          className={`[grid-area:phone] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="text"
          placeholder='Phone'
          value={prospectInfo.prospectPhone}
          onChange={(e) => setProspectInfo({...prospectInfo, prospectPhone:e.target.value})}
        />
        <h2 className={`[grid-area:emailTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Email</h2>
        <input
          className={`[grid-area:email] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="email"
          placeholder='Email'
          value={prospectInfo.prospectEmail}
          onChange={(e) => setProspectInfo({...prospectInfo, prospectEmail:e.target.value})}
        />
        <h2 className={`[grid-area:firstContactTitle] text-[#808080] ${Styles.cardFont} font-bold`}>First Contact Date</h2>
        <input
          className={`[grid-area:firstContact] grow px-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="date"
          value={prospectInfo.prospectFirstcontact.toISOString().split("T")[0]}
          onChange={(e)=> setProspectInfo({...prospectInfo,prospectFirstcontact:new Date(e.target.value)})}
        />
      </div>

      <div className="w-[80%] max-w-[500px] flex justify-between p-[1rem] m-auto">
        <NormalBtn text="Save" clickFunction={clickSave}/>
        <NormalBtn text="+Add New" clickFunction={clickAddNote}/>
      </div>
    </>
  );
}