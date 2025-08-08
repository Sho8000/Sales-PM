"use client"

import { Prospects } from "@/lib/dbInterface";
import Styles from "./Card.module.css"
import { getNextAppointmentDateFromNotes } from "@/lib/nextAppointment";

interface SimpleMediumCardProps {
  prospectData:Prospects
  color?:string
  onClick:(prospectInfo:Prospects)=>void;
}

export default function SimpleMediumCard({prospectData,color="#000000",onClick}:SimpleMediumCardProps) {

  const nextAppointmentDate = getNextAppointmentDateFromNotes(prospectData.notes)?.appointmentDate

  return (
    <div className={`relative self-stretch mx-auto rounded-[10px] bg-white ${Styles.mediumCardComponent}`} onClick={()=>onClick(prospectData)}>
      <div className={`absolute w-full h-[20px] rounded-t-[10px] top-0 left-[0px]`} style={{backgroundColor:color}}></div>
      
      <div className={`w-full flex flex-col justify-between ${Styles.cardFont}`}>
        <div className="flex justify-between font-bold">
          <h2>{prospectData.prospectName}</h2>
          <h2>{prospectData.prospectSex==="Male"?"M":"F"}</h2>
        </div>
        <h2>Age : {prospectData.prospectAge}</h2>
        <h2>{prospectData.prospectMarital}</h2>
        <h2>Children : {prospectData.children}</h2>
        <h2 className="mb-[1.5rem]">{prospectData.prospectBusiness}</h2>

        <h2 className="font-bold">Next Appointment : <span>
            {nextAppointmentDate?<>
              {new Date(nextAppointmentDate).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </>
              :" - "
            }
          </span>
        </h2>

      </div>
    </div>
  );
}