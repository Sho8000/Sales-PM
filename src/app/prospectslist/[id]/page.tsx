"use client"

import AlertBtn from "@/app/(components)/Btn/AlartBtn";
import AlertCard from "@/app/(components)/Card/AlertCard";
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
  const [isOpenFullPersonalInfo,setIsOpenFullPersonalInfo] = useState(false)
  const [isEditProspect,setIsEditPerspect] = useState(false)
  const [isShownHideAlert,setIsShownHideAlert] = useState(false)

  useEffect(()=>{
    if(clickedProspectData && userData){
      setProspectColor(getStatusColorFromProspect(clickedProspectData,userData.statusSetting))
    }
  },[userData,clickedProspectData])

  const showPersonalData = () => {
    if(!isEditProspect){
      setIsOpenFullPersonalInfo(!isOpenFullPersonalInfo)
    } else {
      console.log("edit clicked")
    }
  }

  const clickedEditHandler = () => {
    setIsEditPerspect(!isEditProspect)
  }

  const clickedHideHandler = () => {
    setIsShownHideAlert(true)
  }

  const clickToHide = () => {
    console.log("Hide?")
  }
  const clickToHideCancel = () => {
    setIsShownHideAlert(false)
  }

  return (
    <>
      {clickedProspectData &&
        <>
          <SectionTitle text={"Prospect Info"}
             
          />
          <UpComing text="Appointment"/>
          <SimpleCard
            prospectData={clickedProspectData} 
            color={prospectColor} 
            clickFunctionReceiveProspect={showPersonalData}
            fullInfo={isOpenFullPersonalInfo}
            clickFunctionEdit={clickedEditHandler} 
            clickFunctionHide={clickedHideHandler}
            isEdit={isEditProspect}
          />
          <ProspectDisplay/>

          {isShownHideAlert && 
            <AlertCard
              text="Do you want to add this prospect into the Hidden List?"
              button1={<AlertBtn text="OK" clickFunction={clickToHide}/>}
              button2={<AlertBtn text="Cancel" clickFunction={clickToHideCancel}/>}
            />
          }
          
        </>
      }
    </>
  );
}
