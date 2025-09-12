"use client"

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Styles from "./Setting.module.css"
import StylesCard from "../Card/Card.module.css"
import NormalBtn from "../Btn/NormalBtn";
import { useEffect, useRef, useState } from "react";
import { StatusSetting } from "@/lib/dbInterface";
import { SketchPicker } from 'react-color';
import { useUserInfoStore } from "@/store/userInfoStore";
import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";

interface SettingStatusAndColorProps{
  settingData:StatusSetting[]
}

export default function SettingStatusAndColor({settingData}:SettingStatusAndColorProps) {
  const [isEdit,setIsEdit] = useState(false);
  const [statusInput,setStatusInput] = useState<StatusSetting[]>([]);
  const {changeStatusDeleteStatus} = useSettingPageContext();
  const [activeColorPicker, setActiveColorPicker] = useState<number | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const userData = useUserInfoStore((state) => state.user);
  const userDataReload = useUserInfoStore((state) => state.reload);

  useEffect(()=>{
    setStatusInput(settingData)
  },[])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setActiveColorPicker(null); // close the picker
      }
    };

    if (activeColorPicker !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeColorPicker]);

  const clickEditHandler = () => {
    if(isEdit){
      setStatusInput(settingData)
    }
    setIsEdit(!isEdit)
  }

  const clickAddNewHandler = () => {
    console.log("clicked Add New")
  }

  const clickSaveHandler = async () => {
    if(!userData)return
    try{
      const res = await fetch(`/api/settings/status/${userData.id}`,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusSettingsInfo:statusInput
        })
      })

      if (!res.ok){
        console.log("Error !!!")
        return null;
      };

      userDataReload();
      setIsEdit(false);

    }  catch (error) {
      console.error("Error fetching update Status info requests:", error);
      return null
    }
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
        {settingData.map((settingItems,index)=>{
          return <div key={index} className={`flex border-b-1 border-gray-400 gap-x-[1rem] ${Styles.smallLayout}`}>
            <h2 className={`${Styles.itemsFont} text-[#808080]`}>Status{index+1} :</h2>
            <div className="flex grow gap-[1rem]">
              {!isEdit ? <>
                <div className="flex items-center grow">
                  <h2 className={`${Styles.itemsFont} grow`}>{settingItems.statusName}</h2>
                  <div className={`rounded-[5px] ${Styles.colorSize}`} style={{backgroundColor:settingItems.statusColor}}></div>
                </div>
                {index!==0?
                  <div className={`${Styles.iconSize}`} onClick={()=>changeStatusDeleteStatus(settingItems)}>
                    <MdDelete size={"100%"} color="gray"/>
                  </div>
                  :<div className={`${Styles.iconSize}`}></div>
                }
              </>
              :<div className="flex items-center grow gap-[1rem] pb-1">
                <input
                  className={`${Styles.itemsFont} grow px-[1rem] py-[0.5rem] ${StylesCard.placeholderFont} ${StylesCard.inputLayout}${Styles.placeholderFont} ${Styles.inputLayout}`}
                  type="text"
                  placeholder={settingItems.statusName}
                  value={statusInput[index].statusName}
                  onChange={(e) => {
                    const updatedStatus = statusInput.map((item, i) =>
                      i === index ? { ...item, statusName: e.target.value } : item
                    );
                    setStatusInput(updatedStatus)
                  }}
                />

                {/* Color Input */}
                <div
                  className={`rounded-[5px] ${Styles.colorSize}`}
                  style={{backgroundColor:statusInput[index].statusColor}}
                  onClick={() => setActiveColorPicker(index)}
                ></div>
                {/* Show color picker */}
                {activeColorPicker === index && (
                  <div ref={pickerRef} className="absolute z-50 mt-2 left-1/2 transform -translate-x-1/2">
                    <SketchPicker
                      color={statusInput[index].statusColor}
                      onChange={(color) => {
                        const updatedStatus = statusInput.map((item, i) =>
                          i === index ? { ...item, statusColor: color.hex } : item
                        );
                        setStatusInput(updatedStatus);
                      }}
                    />
                  </div>
                )}
              </div>}
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
