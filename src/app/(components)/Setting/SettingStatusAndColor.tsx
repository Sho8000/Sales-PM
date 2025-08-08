"use client"

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Styles from "./Setting.module.css"
import NormalBtn from "../Btn/NormalBtn";
import { useEffect, useState } from "react";
import { useUserInfoStore } from "@/store/userInfoStore";
import { StatusSetting } from "@/lib/dbInterface";

export default function SettingStatusAndColor() {
  const [isEdit,setIsEdit] = useState(false);
  const [settingData,setSettingData] = useState<StatusSetting[]|null>(null);
//  const [statusOderData,setStatusOderData] = useState(1);
  const userData = useUserInfoStore((state) => state.user); //use user's all Information

  useEffect(()=>{
    if(userData?.statusSetting){
      const sortedSettings = [...userData.statusSetting].sort((a, b) => a.statusOrder - b.statusOrder);
      setSettingData(sortedSettings);
//      setStatusOderData(sortedSettings[sortedSettings.length-1].statusOrder+1)
    }
  },[userData])

  
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
        <h2 className={`${Styles.settingTitleFont}`}>Status & Color</h2>
        <div className={`${Styles.iconSize}`}>
          <FaEdit size={"100%"} color="gray" onClick={clickEditHandler}/>
        </div>
      </div>

      {/* Each Items */}
      <div className="w-full flex flex-col gap-[1rem]">
        {settingData &&
          <>{settingData.map((settingItems,index)=>{
            return <div key={index} className="flex items-center border-b-1 border-gray-400 gap-[1rem]">
              <h2 className={`${Styles.itemsFont} text-[#808080]`}>Status{index+1} :</h2>
              <div className="flex items-center grow">
                <h2 className={`${Styles.itemsFont} grow`}>{settingItems.statusName}</h2>
                <div className={`rounded-[5px] ${Styles.colorSize}`} style={{backgroundColor:settingItems.statusColor}}></div>
              </div>
              <div className={`${Styles.iconSize}`}>
                <MdDelete size={"100%"} color="gray"/>
              </div>
            </div>
          })}
          </>
        }
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
