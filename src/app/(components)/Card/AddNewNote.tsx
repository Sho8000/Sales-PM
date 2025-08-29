"use client"

import { useState } from "react";
import NormalBtn from "../Btn/NormalBtn";
import { Notes } from "@prisma/client";
import Styles from "./Card.module.css"
import { Memos } from "@/lib/dbInterface";
import { useUserInfoStore } from "@/store/userInfoStore";
import { usePathname } from "next/navigation";
import { useAddNewContext } from "@/app/(context)/AddNewOpenContext";

export default function AddNewNoteCard() {
  const [noteInfo,setNoteInfo] = useState<Notes>({
    id:"",
    noteTitle:"",
    content:"",
    status:"",
    appointmentDate: new Date(),
    createdAt: new Date(),
    prospectId:"",
  })
  const [memoInfo,setMemoInfo] = useState<Memos>({
    id:"",
    memoSubject:"",
    memoDetail:"",
    createdAt: new Date(),
    noteId:"",
  })

  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const {changeAddNewPageStatus} = useAddNewContext();
  const pathName = usePathname();
  const prospectId = pathName.split("/").pop();

  const clickNoteSave = async () => {
    try{
      if(
        noteInfo.content === ""
        || noteInfo.status === ""
        || memoInfo.memoDetail === ""
      ){
        console.log("please add all information")
        return null
      }

      if(userData?.prospectList?.id){
        const res = await fetch(`/api/notes`,{
          method:"POST",
          headers:{
            "content-Type":"application/json",
          },
          body: JSON.stringify({
            noteInfo:{
              prospectId:prospectId,
              content:noteInfo.content,
              status:noteInfo.status,
              appointmentDate:noteInfo.appointmentDate,
              memoDetail:memoInfo.memoDetail
            }
          })
        })

        if(!res.ok){
          console.log("Error !!!")
          return null
        }

        changeAddNewPageStatus(false);

      }
    } catch (error) {
      console.error("Error fetching post a new note requests:", error);
      return null
    }

    console.log("clicked Save")
  }

  return (
    <>
    
      <div className={`relative ${Styles.noteInfoLayout} break-all`}>

        {/* input Note information */}
{/* deleted because of the client's request        
        <h2 className={`[grid-area:noteTitle] text-[#808080] ${Styles.cardFont} font-bold`} onClick={()=>{console.log(noteInfo,memoInfo)}}>Title</h2>
        <input
          className={`[grid-area:note] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="text"
          placeholder='Note Title'
          value={noteInfo.noteTitle}
          onChange={(e) => setNoteInfo({...noteInfo, noteTitle:e.target.value})}
        />
 */}        
        <h2 className={`[grid-area:contentTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Content</h2>
        <select
          className={`appearance-none relative [grid-area:content] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}
          ${noteInfo.content===""&&"text-[#808080]"}`}
          name="noteContents"
          value={noteInfo.content}
          onChange={(e) =>
            setNoteInfo({ ...noteInfo, content: e.target.value })
          }
        >
          <option className="text-[#808080]" value="">Select Content</option>
          {userData?.contentsSetting &&
            <>
              {userData.contentsSetting.map((content,contentIndex)=>{
                return <option
                  key={contentIndex}
                  className="text-black"
                  value={content.contentName}>{content.contentName}
                </option>
              })}
            </>
          }
        </select>
        <h2 className={`[grid-area:statusTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Status</h2>
        <select
          className={`appearance-none relative [grid-area:status] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}
          ${noteInfo.status===""&&"text-[#808080]"}`}
          name="noteStatus"
          value={noteInfo.status}
          onChange={(e) =>
            setNoteInfo({ ...noteInfo, status: e.target.value })
          }
        >
          <option className="text-[#808080]" value="">Select Status</option>
          {userData?.statusSetting &&
            <>
              {userData.statusSetting.map((status,statusIndex)=>{
                return <option
                  key={statusIndex}
                  className="text-black"
                  value={status.statusName}>{status.statusName}
                </option>
              })}
            </>
          }
        </select>

        <h2 className={`[grid-area:appointmentTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Appointment Date</h2>
        <input
          className={`[grid-area:appointment] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="date"
          value={noteInfo.appointmentDate? noteInfo.appointmentDate.toISOString().split("T")[0]:"No Appointment"}
          onChange={(e)=> setNoteInfo({...noteInfo,appointmentDate:new Date(e.target.value)})}
        />
{/*     deleted because of the client's request
        <h2 className={`[grid-area:subjectTitle] text-[#808080] ${Styles.cardFont} font-bold`}>Subject</h2>
        <input
          className={`[grid-area:subject] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          type="text"
          placeholder='Memo Subject'
          value={memoInfo.memoSubject}
          onChange={(e) => setMemoInfo({...memoInfo, memoSubject:e.target.value})}
        />
 */}
         <h2 className={`[grid-area:detailTitle] text-[#808080] ${Styles.cardFont} font-bold self-start`}>Note</h2>
        <textarea
          className={`[grid-area:detail] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          rows={5}
          placeholder='Write detail,,,'
          value={memoInfo.memoDetail}
          onChange={(e) => setMemoInfo({...memoInfo, memoDetail:e.target.value})}
        />
      </div>

      <div className="w-full flex justify-center p-[1rem] m-auto">
        <NormalBtn text="Save" clickFunction={clickNoteSave}/>
      </div>
    </>
  );
}