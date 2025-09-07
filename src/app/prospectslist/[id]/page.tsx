"use client"

import AlertBtn from "@/app/(components)/Btn/AlartBtn";
import AlertCard from "@/app/(components)/Card/AlertCard";
import NameCardSmallAndFull from "@/app/(components)/Card/NameCardSmallAndFull";
import SectionTitle from "@/app/(components)/CommonParts/SectionTitle";
import UpComing from "@/app/(components)/CommonParts/UpComing";
import ProspectDisplay from "@/app/(components)/ProspectsList/ID/ProspectDisplay";
import { useAddNewContext } from "@/app/(context)/AddNewOpenContext";
import { getStatusColorFromProspect } from "@/lib/findStatusColor";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useEffect, useState } from "react";

export default function ProspectInfo() {
  const userData = useUserInfoStore((state) => state.user);
  const clickedProspectData = useClickedProspectInfoStore((state) => state.prospect); //use clicked prospect's Information
  const {isEdit,changeIsEditStatus} = useAddNewContext();
    const setClickedProspectData = useClickedProspectInfoStore((state)=>state.setProspect);

  const [prospectColor,setProspectColor] = useState("#000000");
  const [isOpenFullPersonalInfo,setIsOpenFullPersonalInfo] = useState(false)
  const [isShownHideAlert,setIsShownHideAlert] = useState(false)

  useEffect(()=>{
    if(clickedProspectData && userData){
      const fetchProspectInfo = async () => {
        try{
          const res = await fetch(`/api/prospectList/${clickedProspectData.id}`);
          const {data} = await res.json();
          setClickedProspectData({...data,prospectFirstcontact:new Date(data.prospectFirstcontact)})

          setProspectColor(getStatusColorFromProspect(clickedProspectData,userData.statusSetting))
        } catch (error) {
          console.error("Error fetching prospect's data:", error);
        }
      } 

      fetchProspectInfo()
  }
  },[userData,clickedProspectData,setClickedProspectData])

  const showPersonalData = () => {
    if(!isEdit){
      setIsOpenFullPersonalInfo(!isOpenFullPersonalInfo)
    } else {
      console.log("edit clicked")
    }
  }

  const clickedEditHandler = () => {
    changeIsEditStatus(!isEdit)
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
          <NameCardSmallAndFull
            prospectData={clickedProspectData}
            isPersonal={true}
            color={prospectColor} 
            clickFunctionReceiveProspect={showPersonalData}
            fullInfo={isOpenFullPersonalInfo}
            clickFunctionEdit={clickedEditHandler} 
            clickFunctionHide={clickedHideHandler}
            isEdit={isEdit}
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
