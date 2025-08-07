import { getNextAppointmentDateFromAllData, NextAppointmentWithProspect } from "@/lib/nextAppointment";
import Styles from "./CommonParts.module.css"
import { useUserInfoStore } from "@/store/userInfoStore";
import { useEffect, useState } from "react";

interface TitleProps {
  text:"Upcoming"|"Appointment";
  clickFunction: ()=>void;
}

export default function UpComing({text,clickFunction}:TitleProps) {
  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const [earlistAppointmentInfo,setEarlistAppointmentInfo] = useState<NextAppointmentWithProspect|null>(null);

  useEffect(()=>{
    if(userData?.prospectList?.prospects){
      setEarlistAppointmentInfo(getNextAppointmentDateFromAllData(userData.prospectList.prospects))
    }
  },[userData])

  return (
    <div className={`w-full font-bold mb-[1rem] ${Styles.textFont}`}>
      <h2 className={`w-full text-center ${Styles.forPC}`}>
        {text} :
        {earlistAppointmentInfo?
          <span className="text-red-500 underline underline-offset-8" onClick={clickFunction}> {earlistAppointmentInfo.prospectName} : {new Date(earlistAppointmentInfo.note.appointmentDate).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}</span>
          :<span className="text-gray-400"> No Appointment</span>
        }
      </h2>
      <div className={`${Styles.forPhone}`}>
        <h2 className={`w-full text-center`}>
          {text}
        </h2>
        {earlistAppointmentInfo?
          <h2 className="text-red-500 underline text-center underline-offset-8" onClick={clickFunction}> {earlistAppointmentInfo.prospectName} : {new Date(earlistAppointmentInfo.note.appointmentDate).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}</h2>
          :<h2 className="font-medium text-center text-gray-400">No Appointment</h2>
        }
      </div>
    </div>
  );
}
