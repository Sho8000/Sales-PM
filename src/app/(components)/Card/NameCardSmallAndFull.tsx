"use client"

import { Memos, Notes, Prospects } from "@/lib/dbInterface";
import { FaEdit } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import Styles from "./Card.module.css"
import NormalBtn from "../Btn/NormalBtn";
import AlertBtn from "../Btn/AlartBtn";
import { useEffect, useState } from "react";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import { useAddNewContext } from "@/app/(context)/AddNewOpenContext";
import AlertCard from "./AlertCard";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useTempolaryUserDataContext } from "@/app/(context)/TempolaryUserData";
import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";
import { useMissingErrorFlagContext } from "@/app/(context)/MissingErrorFlagContext";

  interface SimpleCardProps {
    isPersonal?:boolean
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

  export default function NameCardSmallAndFull({isPersonal=false,prospectData,noteData,color="#000000",clickFunctionReceiveProspect,clickFunctionReceiveNote,fullInfo=false,clickFunctionEdit,clickFunctionHide,isEdit=false}:SimpleCardProps) {
    const userData = useUserInfoStore((state) => state.user); //use user's all Information
    const clickedProspectData = useClickedProspectInfoStore((state)=>state.prospect);
    const setClickedProspectData = useClickedProspectInfoStore((state)=>state.setProspect);
    const reloadClickedProspect = useClickedProspectInfoStore((state) => state.reload);
    const {isOpenMemo,isNoteEdit,isMemoEdit,changeAddNewMemoPageStatus,changeIsEditStatus,changeIsNoteEditStatus,changeIsMemoEditStatus} = useAddNewContext();
    const {changeSettingRemoveHiddenStatus,changeProspectDeleteStatus} = useSettingPageContext();
    const {changeToHiddenProspectState} = useTempolaryUserDataContext();
    const {changeIsMissingStatus} = useMissingErrorFlagContext();
    const [noteDelete,setNoteDelete] = useState<Notes|null>(null);
    const [memoDelete,setMemoDelete] = useState<Memos|null>(null);
    
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
    const [initialProspectData,setInitialProspectData] = useState<Prospects>({
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

    const [noteInput,setNoteInput] = useState<Notes>({
      id:"",
      noteTitle:"",
      content:"",
      status:"",
      appointmentDate: new Date(),
      createdAt: new Date(),
      prospectId:"",
      memos:[]
    })
    const [memoInfo,setMemoInfo] = useState<Memos>({
      id:"",
      memoSubject:"",
      memoDetail:"",
      createdAt: new Date(),
      noteId:"",
    })   

    const [age,setAge] = useState<number|"">("")
    const [children,setChildren] = useState<number|"">("")

    useEffect(()=>{
      if(prospectData && prospectInfo.id === ""){
        setProspectInfo({...prospectData,prospectFirstcontact:new Date(prospectData.prospectFirstcontact)})
        setAge(prospectData.prospectAge)
        setChildren(prospectData.children) 
        setInitialProspectData({...prospectData,prospectFirstcontact:new Date(prospectData.prospectFirstcontact)}) 
      }
    },[prospectData,prospectInfo.id])

    const updateProspectInfo = async () => {
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
          changeIsMissingStatus("Please add All Information!!")
          return null
        }

        if(clickedProspectData?.id){
          const res = await fetch(`/api/prospectList/${clickedProspectData.id}`,{
            method:'PUT',
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

          setClickedProspectData({...data,prospectFirstcontact:new Date(data.prospectFirstcontact),notes:clickedProspectData.notes})
          setProspectInfo({...data,prospectFirstcontact:new Date(data.prospectFirstcontact),notes:clickedProspectData.notes})
          setInitialProspectData({...data,prospectFirstcontact:new Date(data.prospectFirstcontact),notes:clickedProspectData.notes})

          reloadClickedProspect();
          changeIsEditStatus(false)
        }

      } catch (error) {
        console.error("Error fetching update Prospect info requests:", error);
        return null
      }
    }
    const cancelEdit = () => {
      changeIsEditStatus(false)
      if(clickedProspectData){
        setProspectInfo({...initialProspectData,prospectFirstcontact:new Date(initialProspectData.prospectFirstcontact)})
      }
    }

    const deleteNoteHandler = async () => {
      if(noteDelete?.id){
        const res = await fetch(`/api/notes/${noteDelete.id}`,{
          method:'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (!res.ok){
          console.log("Error !!!")
          return null;
        };
      }

      if(clickedProspectData){
        const getRes = await fetch(`/api/prospectList/${clickedProspectData.id}`);

        const {data} = await getRes.json();
        setClickedProspectData({...data,prospectFirstcontact:new Date(data.prospectFirstcontact)});
      }

      reloadClickedProspect();
      setNoteDelete(null)
    }

    const editNote = async () => {
      if(noteData){
        if(isNoteEdit===noteData.id){
          changeIsNoteEditStatus(null)
        } else{
          changeIsNoteEditStatus(noteData.id)
          if(noteData.appointmentDate){
            setNoteInput({...noteData,appointmentDate:new Date(noteData.appointmentDate)})
          } else{
            setNoteInput({...noteData,appointmentDate:null})
          }
        }
      }
    }
    const noteEditSave = async() => {
      try{
        const res = await fetch(`/api/notes/${noteInput.id}`,{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            noteInfo:noteInput
          })
        })

        if (!res.ok){
          console.log("Error !!!")
          return null;
        };

        if(clickedProspectData){
          const getRes = await fetch(`/api/prospectList/${clickedProspectData.id}`);
    
          const {data} = await getRes.json();
          setClickedProspectData({...data,prospectFirstcontact:new Date(data.prospectFirstcontact)});
        }  

        reloadClickedProspect();
        changeIsNoteEditStatus(null)

      } catch (error) {
        console.error("Error fetching update Note info requests:", error);
        return null
      }
    }

    const addMemo = (noteData:Notes) => {
      changeAddNewMemoPageStatus(noteData);
    }

    const editMemo = async (memoId:string) => {
      if(noteData){
        if(isMemoEdit && isMemoEdit.memoId===memoId){
          changeIsMemoEditStatus(null)
        } else {
          changeIsMemoEditStatus({note:noteData,memoId:memoId})

          const memoData = noteData.memos.find(memo=>memo.id===memoId)
          setMemoInfo({...memoData!})
        }
      }
    }
    const editMemoSave = async () => {
      try{
        const res = await fetch(`/api/memos/${memoInfo.id}`,{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            memoInfo:memoInfo
          })
        })

        if (!res.ok){
          console.log("Error !!!")
          return null;
        };

        if(clickedProspectData){
          const getRes = await fetch(`/api/prospectList/${clickedProspectData.id}`);
    
          const {data} = await getRes.json();
          setClickedProspectData({...data,prospectFirstcontact:new Date(data.prospectFirstcontact)});
        }  

        reloadClickedProspect();
        changeIsMemoEditStatus(null)

      }  catch (error) {
        console.error("Error fetching update Memo info requests:", error);
        return null
      }
    }
    
    const deleteMemo = async (id:string) => {
      const res = await fetch(`/api/memos/${id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!res.ok){
        console.log("Error !!!")
        return null;
      };
      reloadClickedProspect();
    }
    

    return (
      <div className={`relative flex items-center w-[90%] m-auto rounded-[10px] bg-white ${Styles.smallCardComponent}`}>
        <div className={`absolute w-[20px] h-full rounded-l-[10px] left-[-1px]`} style={{backgroundColor:color}}></div>
        
        {/* This is for "/prospectslist" */}
        {(!isPersonal && prospectData) &&
          <div className={`flex w-full h-full justify-between items-center ${Styles.cardFont} font-bold`} 
          onClick={()=>{
            if(clickFunctionReceiveProspect){
              clickFunctionReceiveProspect(prospectData)
            }}}
          >
            <div className={`flex justify-between items-center basis-1/2 gap-x-[2rem] ${Styles.smallCardComponentLeft}`}>
              <h2>{prospectData.prospectName}</h2>
              <h2 className={`${Styles.MorFDisplay}`}>{prospectInfo.prospectSex==="Male"?"M":"F"}</h2>
              <h2 className={`${Styles.MaleOrFemaleDisplay}`}>{prospectInfo.prospectSex}</h2>
            </div>
            {!prospectData.prospectHidden?
              <h2>{prospectData.prospectBusiness}</h2>
              :<>
                <div className="flex gap-[1rem]">
                  <div className={`${Styles.iconSize}`}
                    onClick={(e)=>{
                      e.stopPropagation();
                      changeSettingRemoveHiddenStatus(prospectData);
                      clickFunctionEdit?.();
                    }}
                  >
                    <IoMdEye size={"100%"} color="gray"/>
                  </div>
                  <div className={`${Styles.iconSize}`}
                    onClick={(e)=>{
                      e.stopPropagation();
                      changeProspectDeleteStatus(prospectData)
                      clickFunctionHide?.();
                    }}
                  >
                    <MdDelete size={"100%"} color="gray"/>
                  </div>
                </div>
              </>}
          </div>
        }

        {/* This is for "/prospectslist/** " */}
        {(isPersonal) &&
          <div className={`flex w-full h-full justify-between items-center ${Styles.cardFont} font-bold`} 
          onClick={()=>{
            if(clickFunctionReceiveProspect){
              clickFunctionReceiveProspect(prospectInfo)
            }}}
          >
            {!fullInfo ?
              <>
                <div className={`flex justify-between items-center basis-1/2 gap-x-[2rem] ${Styles.smallCardComponentLeft}`}>
                  <h2>{prospectInfo.prospectName}</h2>
                  <h2 className={`${Styles.MorFDisplay}`}>{prospectInfo.prospectSex==="Male"?"M":"F"}</h2>
                  <h2 className={`${Styles.MaleOrFemaleDisplay}`}>{prospectInfo.prospectSex}</h2>
                </div>
                <h2>{prospectInfo.prospectBusiness}</h2>
              </>
              :<>
                <div className={`w-full relative ${Styles.fullInfoLayout} break-all`}>
                  <div className="absolute flex top-0 right-0 gap-[1rem]">
                    <div className={`${Styles.iconSize}`}
                      onClick={(e)=>{
                        e.stopPropagation();
                        setProspectInfo({...initialProspectData,prospectFirstcontact:new Date(initialProspectData.prospectFirstcontact)})
                        setAge(initialProspectData.prospectAge)
                        setChildren(initialProspectData.children)
                        clickFunctionEdit?.();
                      }}
                    >
                      <FaEdit size={"100%"} color="gray"/>
                    </div>
                    <div className={`${Styles.iconSize}`}
                      onClick={(e)=>{
                        e.stopPropagation();
                        changeToHiddenProspectState(initialProspectData)
                        clickFunctionHide?.();
                      }}
                    >
                      <IoMdEyeOff size={"100%"} color="gray"/>
                    </div>
                  </div>
                  
                  {!isEdit?<>
                    <h2 className="[grid-area:nameTitle] text-[#808080]">Name</h2>
                    <h2 className="[grid-area:name]">{prospectInfo.prospectName}</h2>
                    <h2 className="[grid-area:sexTitle] text-[#808080]">Sex</h2>
                    <h2 className="[grid-area:sex]">{prospectInfo.prospectSex}</h2>
                    <h2 className="[grid-area:ageTitle] text-[#808080]">Age</h2>
                    <h2 className="[grid-area:age]">{prospectInfo.prospectAge}</h2>
                    <h2 className="[grid-area:maritalTitle] text-[#808080]">Marital Status</h2>
                    <h2 className="[grid-area:marital]">{prospectInfo.prospectMarital}</h2>
                    <h2 className="[grid-area:childrenTitle] text-[#808080]">Children</h2>
                    <h2 className="[grid-area:children]">{prospectInfo.children}</h2>
                    <h2 className="[grid-area:businessTitle] text-[#808080]">Business Name</h2>
                    <h2 className="[grid-area:business]">{prospectInfo.prospectBusiness}</h2>
                    <h2 className="[grid-area:positionTitle] text-[#808080]">Position</h2>
                    <h2 className="[grid-area:position]">{prospectInfo.prospectPosition}</h2>
                    <h2 className="[grid-area:locationTitle] text-[#808080]">Location</h2>
                    <h2 className="[grid-area:location]">{prospectInfo.prospectLocation}</h2>
                    <h2 className="[grid-area:phoneTitle] text-[#808080]">Phone</h2>
                    <h2 className="[grid-area:phone]">{prospectInfo.prospectPhone}</h2>
                    <h2 className="[grid-area:emailTitle] text-[#808080]">Email</h2>
                    <h2 className="[grid-area:email]">{prospectInfo.prospectEmail}</h2>
                    <h2 className="[grid-area:firstContactTitle] text-[#808080]">First Contact Date</h2>
                    <h2 className="[grid-area:firstContact]">{new Date(prospectInfo.prospectFirstcontact).toLocaleString("en-US", {
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
                      onChange={(e)=> {
                        if (e.target.value === "") {
                          setProspectInfo({ ...prospectInfo, prospectFirstcontact: new Date() });
                        } else {
                          const [year, month, day] = e.target.value.split("-").map(Number);
                          const localDate = new Date(year, month - 1, day);

                          setProspectInfo({...prospectInfo,prospectFirstcontact:localDate})}
                        }
                      }
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
          <div className={`flex w-full h-full justify-between items-center gap-[2rem] ${Styles.cardFont} font-bold`}
          onClick={()=>{
            if(clickFunctionReceiveNote){
              clickFunctionReceiveNote(noteData)
            }
          }}
          >
            {!isOpenMemo.find(memo=>
              (memo.id===noteData.id) && memo.isOpen) ?
              <>
                {/* <h2>{noteData.noteTitle}</h2> */}
                <h2>{noteData.content}</h2>
                <div className={`${Styles.iconSize}`}
                  onClick={(e)=>{
                    e.stopPropagation();
                    setNoteDelete(noteData);
                  }}
                >
                  <MdDelete size={"100%"} color="gray"/>
                </div>
              </>
              :<>
                <div className="relative w-full py-[1rem]">
                  {/* icons */}
                  <div className="absolute right-0 flex gap-[1rem]">
                    <div className={`${Styles.iconSize}`}
                      onClick={(e)=>{
                        e.stopPropagation();
                        addMemo(noteData);
                      }}
                    >
                      <IoIosAdd size={"100%"} color="gray"/>
                    </div>
                    <div className={`${Styles.iconSize}`}
                      onClick={(e)=>{
                        e.stopPropagation();
                        editNote();
                      }}
                    >
                      <FaEdit size={"100%"} color="gray"/>
                    </div>
                  </div>

                  {isNoteEdit !== noteData.id ?
                    <div>
                      <div className={`w-full ${Styles.memoLayout}`}>
                        <h2 className="basis-1/2">{noteData.content}</h2>
                        <h2>{noteData.status}</h2>
                      </div>
                      <h2>Appointment : 
                        <span>
                          {noteData.appointmentDate ?
                            <>
                              {new Date(noteData.appointmentDate).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              })}
                            </>:<> -</>
                          }
                        </span>
                      </h2>
                    </div>
                    :<div>
                      <div>
                        {/* Edit */}
                        <div className={`w-[70%] ${Styles.memoLayout} gap-[1rem] mb-[1rem]`}>
                          <select 
                            className={`basis-2/3 appearance-none pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout}`}
                            name="noteContents"
                            value={userData?.contentsSetting?.some(s => s.contentName === noteInput.content)
                              ? noteInput.content
                              : "-"}
                            onChange={(e)=>
                              setNoteInput({...noteInput, content:e.target.value})
                            }
                          >
                            <option disabled value="-">-- Select Content --</option>
                            {userData?.contentsSetting &&
                              <>
                                {userData.contentsSetting.map((content,contentIndex)=>{
                                  return <option
                                    key={contentIndex}
                                    value={content.contentName}
                                  >
                                    {content.contentName}
                                  </option>
                                })}
                              </>
                            }
                          </select>
                          <select 
                            className={`appearance-none pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout}`}
                            name="noteStatus"
                            value={userData?.statusSetting?.some(s => s.statusName === noteInput.status)
                              ? noteInput.status
                              : "-"}
                            onChange={(e)=>
                              setNoteInput({...noteInput, status:e.target.value})
                            }
                          >
                            {userData?.statusSetting &&
                              <>
                                <option disabled value="-">-- Select Status --</option>
                                {userData.statusSetting.map((status,statusIndex)=>{
                                  return <option
                                    key={statusIndex}
                                    value={status.statusName}
                                  >
                                    {status.statusName}
                                  </option>
                                })}
                              </>
                            }
                          </select>
                        </div>
                        <input
                          className={`pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout}`}
                          type="date"
                          value={noteInput.appointmentDate? noteInput.appointmentDate.toISOString().split("T")[0]:""}
                          onChange={(e)=> {
                            if (e.target.value === "") {
                              setNoteInput({ ...noteInput, appointmentDate: null });
                            } else {
                              const [year, month, day] = e.target.value.split("-").map(Number);
                              const localDate = new Date(year, month - 1, day);
                              setNoteInput({...noteInput,appointmentDate:localDate})}
                            }
                          }
                        />
                      </div>
                      <div className="w-full text-center mt-[1rem]">
                        <NormalBtn text="Save" clickFunction={noteEditSave}/>
                      </div>
                    </div>
                  }

                  {noteData.memos
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((memo,memoIndex)=>{
                    return <div key={memoIndex} className="relative border-t-1 border-black mt-[1rem] pt-[1rem]">
                      {/* Icons */}
                      <div className="absolute right-0 flex gap-[0.5rem]">
                        <div className={`${Styles.iconSize}`}
                          onClick={(e)=>{
                            e.stopPropagation();
                            editMemo(memo.id);
                          }}
                        >
                          <FaEdit size={"100%"} color="gray"/>
                        </div>
                        <div className={`${Styles.iconSize}`}
                          onClick={(e)=>{
                            e.stopPropagation();
                            setMemoDelete(memo);
                          }}
                        >
                          <MdDelete size={"100%"} color="gray"/>
                        </div>
                      </div>

                      {/* Memo Edit */}
                      {!isMemoEdit || isMemoEdit.memoId!==memo.id ? 
                      <>
                        <h2>Note{noteData.memos.length - memoIndex}</h2>
                        <h2>
                          {new Date(memo.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          })}
                        </h2>
                        <h2 className="font-medium pt-[1rem]">{memo.memoDetail}</h2>
                      </>
                      :<>
                        <h2>Note{noteData.memos.length - memoIndex}</h2>
                        <h2>
                          {new Date(memo.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          })}
                        </h2>
                        <div className="text-center">
                          <textarea
                            className={`w-[90%] pl-[1rem] py-[0.5rem] mt-[1rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
                            rows={5}
                            placeholder='Write detail,,,'
                            value={memoInfo.memoDetail}
                            onChange={(e) => setMemoInfo({...memoInfo, memoDetail:e.target.value})}
                          />
                        </div>
                        <div className="text-center my-[1rem]">
                          <NormalBtn text="Save" clickFunction={editMemoSave}/>
                        </div>
                      </>}
                    </div>
                  })}
                  
                </div>
              </>
            }
          </div>
        }

        {noteDelete &&
          <div className="fixed z-50">
            <AlertCard
              text={`Do you want to delete "${noteDelete.content}" Note?`}
              button1={<AlertBtn text="Delete" clickFunction={deleteNoteHandler}/>}
              button2={<AlertBtn text="Cancel" clickFunction={()=>setNoteDelete(null)}/>}
            />
          </div>
        }

        {memoDelete &&
          <div className="fixed z-50">
          <AlertCard
            text={`Do you want to delete this Memo?`}
            button1={<AlertBtn text="Delete" clickFunction={()=>{
              deleteMemo(memoDelete.id);
              setMemoDelete(null);
            }}/>}
            button2={<AlertBtn text="Cancel" clickFunction={()=>setMemoDelete(null)}/>}
          />
        </div>
      }
      </div>
    );
  }