import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import Styles from "../prospectsList.module.css"
import ProspectTitle from "./ProspectTitle";
import NormalBtn from "../../Btn/NormalBtn";
import { useEffect, useState } from "react";
import DropDown from "../../DropDown/DropdownList";
import { useUserInfoStore } from "@/store/userInfoStore";
import { getStatusColorFromNote } from "@/lib/findStatusColor";
import { Notes, Prospects } from "@/lib/dbInterface";
import AddNewTemplate from "../../Card/AddNewTemplate";
import { useAddNewContext } from "@/app/(context)/AddNewOpenContext";
import NameCardSmallAndFull from "../../Card/NameCardSmallAndFull";

export default function ProspectDisplay() {
    const userData = useUserInfoStore((state) => state.user);
    const clickedProspectData = useClickedProspectInfoStore((state) => state.prospect); //use clicked prospect's Information
    const setClickedProspectData = useClickedProspectInfoStore((state)=>state.setProspect);
    const [getProspect,setProspect] = useState<Prospects|null>(null)
    const {isAddNewPage,changeAddNewPageStatus,changeIsOpenMemoList} = useAddNewContext()

    const [selectedFilter,setSlectedFilter] = useState("0")
    const [selectedSort,setSlectedSort] = useState("0")

    useEffect(()=>{
      if(clickedProspectData){
        const fetchProspectInfo = async () => {
          try{
            const res = await fetch(`/api/prospectList/${clickedProspectData.id}`);
            const {data} = await res.json();
            setProspect({...data,prospectFirstcontact:new Date(data.prospectFirstcontact)})
            setClickedProspectData({...data,prospectFirstcontact:new Date(data.prospectFirstcontact)})
          } catch (error) {
            console.error("Error fetching prospect's data:", error);
          }
        } 

        fetchProspectInfo()
      }
    },[])

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
      changeIsOpenMemoList(note.id);
    }

  return (
    <>
      <div className={`max-h-[70vh] overflow-y-scroll m-auto bg-yellow-50 border-2 border-gray-300 rounded-md pt-[1.5rem] pb-[2rem] mt-[2rem]
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
        <div className="flex flex-col gap-[1rem]">
          {(clickedProspectData && getProspect && getProspect.notes.length<=0)?
            <h2 className={`${Styles.textFont} text-center mt-[1rem]`}>No Note,,,</h2>
            :<>
              {userData?.statusSetting && getProspect?.notes.map((noteData,noteIndex)=>{
                const noteColor = getStatusColorFromNote(noteData,userData?.statusSetting) 
                return <NameCardSmallAndFull key={noteIndex} color={noteColor} noteData={noteData} clickFunctionReceiveNote={clickedNoteCardHandler}/>
              })}
            </>
          }
        </div>
      </div>

      {isAddNewPage &&
        <AddNewTemplate text={"New Note"}/>
      }
    </>
  );
}
