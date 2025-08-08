"use client"

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Styles from "./Setting.module.css"
import NormalBtn from "../Btn/NormalBtn";
import { useState } from "react";
import { ContentsSetting } from "@/lib/dbInterface";

interface SettingContentsProps{
  contentsData:ContentsSetting[]
}

export default function SettingContents({contentsData}:SettingContentsProps) {
  const [isEdit,setIsEdit] = useState(false);
  
  const clickEditHandler = () => {
    setIsEdit(!isEdit)
    console.log("clicked Edit")
  }
/* 
  const clickDeleteHandler = () => {
    console.log("clicked Delete")
  }
 */
  const clickAddNewHandler = () => {
    console.log("clicked Add New")
  }

  const clickSaveHandler = () => {
    console.log("clicked Save")
  }

  return (
    <div className={`w-[90%] m-auto pb-[2rem]`}>
      {/* Title & Edit */}
      <div className="flex justify-between items-center mb-[2rem]">
        <h2 className={`${Styles.settingTitleFont}`}>Content</h2>
        <div className={`${Styles.iconSize}`}>
          <FaEdit size={"100%"} color="gray" onClick={clickEditHandler}/>
        </div>
      </div>

      {/* Each Items */}
      <div className="w-full flex flex-col gap-[1rem]">
        {contentsData.map((contents,index)=>{
          return <div key={index} className="flex items-center border-b-1 border-gray-400 gap-[1rem]">
            <h2 className={`${Styles.itemsFont} text-[#808080]`}>Content{index+1} :</h2>
            <h2 className={`grow ${Styles.itemsFont} grow`}>{contents.contentName}</h2>
            <div className={`${Styles.iconSize}`}>
              <MdDelete size={"100%"} color="gray"/>
            </div>
          </div>
        })}
      </div>

      {/* Add New or Save Btn*/}
      {isEdit?
        <div className="w-full text-center mt-[2rem]">
          <NormalBtn text="Save" clickFunction={clickSaveHandler}/>
        </div>
        :<div className="w-full text-center mt-[2rem]">
          <NormalBtn text="+Add New" clickFunction={clickAddNewHandler}/>
        </div>
      }
    </div>
  );
}
