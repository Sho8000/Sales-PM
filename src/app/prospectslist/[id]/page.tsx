"use client"

import SimpleCard from "@/app/(components)/Card/SimpleSmallCard";
import SectionTitle from "@/app/(components)/CommonParts/SectionTitle";
import UpComing from "@/app/(components)/CommonParts/UpComing";
import ProspectDisplay from "@/app/(components)/ProspectsList/ID/ProspectDisplay";
import { getStatusColorFromProspect } from "@/lib/findStatusColor";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useEffect, useState } from "react";

export default function ProspectInfo() {
  const userData = useUserInfoStore((state) => state.user);
  const clickedProspectData = useClickedProspectInfoStore((state) => state.prospect); //use clicked prospect's Information

  const [prospectColor,setProspectColor] = useState("#000000");

  useEffect(()=>{
    if(clickedProspectData && userData){
      setProspectColor(getStatusColorFromProspect(clickedProspectData,userData.statusSetting))
    }
  },[userData,clickedProspectData])

  const showPersonalData = () => {
    console.log("show Personal data")   
  }

  return (
    <>
      {clickedProspectData &&
        <>
          <SectionTitle text={"Prospect Info"}
             
          />
          <UpComing text="Appointment"/>
          <SimpleCard prospectData={clickedProspectData} color={prospectColor} clickFunctionReceiveProspect={showPersonalData}/>
          <ProspectDisplay/>
        </>
      }
    </>
  );
}
