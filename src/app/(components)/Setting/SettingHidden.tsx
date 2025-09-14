"use client"

import Styles from "./Setting.module.css"
import { useUserInfoStore } from "@/store/userInfoStore";
import NameCardSmallAndFull from "../Card/NameCardSmallAndFull";
import { getStatusColorFromProspect } from "@/lib/findStatusColor";

export default function SettingHidden() {
  const userData = useUserInfoStore((state) => state.user);
  
  return (
    <div className={`w-[90%] m-auto pb-[2rem]`}>
      <div className="flex justify-start items-center mb-[2rem] m-auto">
        <h2 className={`${Styles.settingTitleFont}`}>Hidden List</h2>
      </div>

      <div className="flex flex-col gap-[1rem]">
        {userData?.prospectList?.prospects.filter((prospct)=>prospct.prospectHidden===true).map((prospectData,index)=>{
          const color = getStatusColorFromProspect(prospectData,userData.statusSetting);

            return <NameCardSmallAndFull key={index} prospectData={prospectData} color={color} clickFunctionReceiveProspect={()=>{}}/>
        })}
      </div>
    </div>
  );
}
