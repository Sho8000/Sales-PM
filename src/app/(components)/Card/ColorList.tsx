"use client"

import { useUserInfoStore } from "@/store/userInfoStore";
import Styles from "./Card.module.css"

export default function ColorList() {
    const userData = useUserInfoStore((state) => state.user); //use user's all Information

  return (
    <>
      <div className={`${Styles.ColorListComponent} w-fit bg-[#fff6e6] rounded-[10px] border-1 border-black p-[1rem]`}>
          {userData?.statusSetting &&
            userData.statusSetting.map((status,index)=>{
              return <div key={index} className={`flex items-center gap-[1rem]`}>
                <div className={`${Styles.colorListBar}`} style={{backgroundColor:`${status.statusColor}`}}></div>
                <div className={`text-nowrap ${Styles.colorListFont}`}>{status.statusName}</div>
              </div>
            })
          }
      </div>
    </>
  );
}