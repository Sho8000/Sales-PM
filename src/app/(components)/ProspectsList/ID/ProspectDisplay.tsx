import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import Styles from "../prospectsList.module.css"
import ProspectTitle from "./ProspectTitle";
import NormalBtn from "../../Btn/NormalBtn";
import { useState } from "react";
import DropDown from "../../DropDown/DropdownList";
import { useUserInfoStore } from "@/store/userInfoStore";
import { getStatusColorFromNote } from "@/lib/findStatusColor";
import SimpleCard from "../../Card/SimpleSmallCard";
import { Notes } from "@/lib/dbInterface";
import AddNewTemplate from "../../Card/AddNewTemplate";
import { useAddNewContext } from "@/app/(context)/AddNewOpenContext";

export default function ProspectDisplay() {
    const userData = useUserInfoStore((state) => state.user);
    const clickedProspectData = useClickedProspectInfoStore((state) => state.prospect); //use clicked prospect's Information
    const {isAddNewPage,changeAddNewPageStatus} = useAddNewContext()

    const [selectedFilter,setSlectedFilter] = useState("0")
    const [selectedSort,setSlectedSort] = useState("0")

    const addNoteHandler = () => {
      changeAddNewPageStatus(true);
    }

    const selectedFilterValue = (selectedValue: string) => {
      setSlectedFilter(selectedValue);
      console.log("Selected filter", selectedValue);
    };
    
    const selectedSortValue = (selectedValue: string) => {
      setSlectedSort(selectedValue);
      console.log("Selected sort", selectedValue);
    };  

    const clickedNoteCardHandler = (note:Notes) => {
      console.log("note Clicked",note)
    }

  return (
    <>
      <div className={`max-h-[70vh] overflow-y-scroll flex m-auto bg-yellow-50 border-2 border-gray-300 rounded-md pt-[1.5rem] pb-[2rem] mt-[2rem]
        ${Styles.listCardLayout}  
      `}>
        {/* Title and Filter */}
        <div className={`${Styles.displayPadding}`}>
          <ProspectTitle button={
            <NormalBtn text="+Add Note" clickFunction={addNoteHandler} changeToPlus={true}/>}
          />

          <div className={`flex gap-[1rem] justify-evenly items-center flex-wrap mt-[2rem]`}>
            <DropDown filter="Filter" value={selectedFilter} onChange={selectedFilterValue}/>
            <DropDown filter="Sort" value={selectedSort} onChange={selectedSortValue}/>
          </div>
        </div>


        {/* Notes */}
        {(clickedProspectData && clickedProspectData.notes.length<=0)?
          <h2 className={`${Styles.textFont} text-center mt-[1rem]`}>No Note,,,</h2>
          :<>
            {userData?.statusSetting && clickedProspectData?.notes.map((noteData,noteIndex)=>{
              const noteColor = getStatusColorFromNote(noteData,userData?.statusSetting) 
              return <SimpleCard key={noteIndex} color={noteColor} noteData={noteData} clickFunctionReceiveNote={clickedNoteCardHandler}/>
            })}
          </>
        }
      </div>

      {isAddNewPage &&
        <AddNewTemplate text={"New Note"}/>
      }
    </>
  );
}
