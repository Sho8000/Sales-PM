"use client"

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Styles from "./Setting.module.css"
import StylesCard from "../Card/Card.module.css"
import NormalBtn from "../Btn/NormalBtn";
import { useEffect, useState } from "react";
import { ContentsSetting } from "@/lib/dbInterface";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";

interface SettingContentsProps{
  contentsData:ContentsSetting[]
}

export default function SettingContents({contentsData}:SettingContentsProps) {
  const [isEdit,setIsEdit] = useState(false);
  const [contentsInput,setContentsInput] = useState<ContentsSetting[]>([]);
  const {changeSettingContentNewStatus,changeContentDeleteStatus} = useSettingPageContext();

  const userData = useUserInfoStore((state) => state.user);
  const userDataReload = useUserInfoStore((state) => state.reload);
  
  useEffect(()=>{
    setContentsInput(contentsData)
  },[])

  const clickEditHandler = () => {
    if(isEdit){
      setContentsInput(contentsData)
    }
    setIsEdit(!isEdit)
  }

  const clickAddNewHandler = () => {
    changeSettingContentNewStatus(true)
  }

  const clickSaveHandler = async() => {
    if(!userData)return
    try{
      const res = await fetch(`/api/settings/contents/${userData.id}`,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentsSettingsInfo:contentsInput
        })
      })

      if (!res.ok){
        console.log("Error !!!")
        return null;
      };

      userDataReload();
      setIsEdit(false);

    }  catch (error) {
      console.error("Error fetching update Contents info requests:", error);
      return null
    }
  }

  return (
    <div className={`w-[90%] m-auto pb-[2rem]`}>
      {/* Title & Edit */}
      <div className="flex justify-between items-center mb-[2rem]">
        <h2 className={`${Styles.settingTitleFont}`}>Content</h2>
        {contentsData.length!==0 &&
          <div className={`${Styles.iconSize}`}>
            <FaEdit size={"100%"} color="gray" onClick={clickEditHandler}/>
          </div>
        }
      </div>

      {/* Each Items */}
      <div className="w-full flex flex-col gap-[1rem]">
        {contentsData.length===0 &&
          <h2 className={`${StylesCard.textFont} text-gray-400`}>Please add Contents what you want!</h2>
        }
        {contentsData.map((contents,index)=>{
          return <div key={index} className={`flex border-b-1 border-gray-400 gap-[1rem] ${Styles.smallLayout}`}>
            <h2 className={`${Styles.itemsFont} text-[#808080]`}>Content{index+1} :</h2>
            {!isEdit ?<div className="flex justify-between grow">
              <h2 className={`grow ${Styles.itemsFont} grow`}>{contents.contentName}</h2>
              {index!==0 ?
                <div className={`${Styles.iconSize}`} onClick={()=>changeContentDeleteStatus(contents)}>
                  <MdDelete size={"100%"} color="gray"/>
                </div>
                :<div className={`${Styles.iconSize}`}></div>
              }
            </div>
            :<div className="flex justify-between grow">
              <input
                className={`${Styles.itemsFont} grow px-[1rem] py-[0.5rem] mb-1 ${StylesCard.placeholderFont} ${StylesCard.inputLayout}${Styles.placeholderFont} ${Styles.inputLayout}`}
                type="text"
                placeholder={contents.contentName}
                value={contentsInput[index].contentName}
                onChange={(e) => {
                  const updatedContents = contentsInput.map((item, i) =>
                    i === index ? { ...item, contentName: e.target.value } : item
                  );
                  setContentsInput(updatedContents)
                }}
              />
            </div>}
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
