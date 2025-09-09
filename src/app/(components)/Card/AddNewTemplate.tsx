"use client"

import { useAddNewContext } from "@/app/(context)/AddNewOpenContext"
import CloseBtn from "../Btn/CloseBtn"
import SectionTitle from "../CommonParts/SectionTitle"
/* useing CSS in Setting component */
import Styles from "./../Setting/Setting.module.css"
import AddNewProspectCard from "./AddNewProspect"
import AddNewNoteCard from "./AddNewNote"
import AddNewMemoCard from "./AddNewMemo"

interface AddNewProspectProps {
  text:"New Prospect"|"New Note"|"Add Memo"
}

export default function AddNewTemplate({text}:AddNewProspectProps) {
  const {changeAddNewPageStatus,changeAddNewMemoPageStatus} = useAddNewContext()

  const closeBtnAddNewHandelr = () => {
    changeAddNewPageStatus(false)
    changeAddNewMemoPageStatus(null)
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
      <div className={`absolute top-0 right-0 translate-y-[50%] translate-x-[-30%] z-50`}>
        <CloseBtn clickFunction={closeBtnAddNewHandelr}/>
      </div>
      
      <div className={`relative max-h-[90vh] overflow-y-auto top-[50%] left-[50%] translate-[-50%] rounded-[10px] py-[1rem] bg-[#fdfdfd]
        ${Styles.whiteBox}  
      `}>

        <SectionTitle text={text}/>

        {text==="New Prospect" &&
          <AddNewProspectCard/>
        }
        {text==="New Note" &&
          <AddNewNoteCard/>
        }
        {text==="Add Memo" &&
          <AddNewMemoCard/>
        }
      </div>
    </div>

  );
}