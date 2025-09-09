"use client"

import { useState } from "react";
import NormalBtn from "../Btn/NormalBtn";
import Styles from "./Card.module.css"
import { Memos } from "@/lib/dbInterface";
import { useAddNewContext } from "@/app/(context)/AddNewOpenContext";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";

export default function AddNewMemoCard() {
  const [memoInfo,setMemoInfo] = useState<Memos>({
    id:"",
    memoSubject:"",
    memoDetail:"",
    createdAt: new Date(),
    noteId:"",
  })

  const {isAddNewMemoPage,changeAddNewMemoPageStatus} = useAddNewContext();
  const reloadClickedProspect = useClickedProspectInfoStore((state) => state.reload);

  const clickMemoSave = async () => {
    if(isAddNewMemoPage){
      try{
        if(memoInfo.memoDetail === ""){
          console.log("please add memoDetail")
          return null
        }

        const res = await fetch(`/api/memos`,{
          method:"POST",
          headers:{
            "content-Type":"application/json",
          },
          body: JSON.stringify({
            memoInfo:{
              noteId:isAddNewMemoPage.id,
              memoDetail:memoInfo.memoDetail
            }
          })
        })

        if(!res.ok){
          console.log("Error !!!")
          return null
        }

        reloadClickedProspect();
        changeAddNewMemoPageStatus(null);
      } catch (error) {
        console.error("Error fetching post a new memo requests:", error);
        return null
      }
    }
  }

  return (
    <>
    
      <div className={`relative ${Styles.memoAddLayout} break-all`}>
        <h2 className={`[grid-area:memoDetailTitle] text-[#808080] ${Styles.cardFont} font-bold self-start`}>Memo Detail</h2>
        <textarea
          className={`[grid-area:memoDetail] grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout} ${Styles.marginBtm}`}
          rows={5}
          placeholder='Write detail,,,'
          value={memoInfo.memoDetail}
          onChange={(e) => setMemoInfo({...memoInfo, memoDetail:e.target.value})}
        />
      </div>

      <div className="w-full flex justify-center p-[1rem] m-auto">
        <NormalBtn text="Save" clickFunction={clickMemoSave}/>
      </div>
    </>
  );
}