"use client"

import AlertBtn from "@/app/(components)/Btn/AlartBtn";
import AlertCard from "@/app/(components)/Card/AlertCard";
import AlertInputAllInfoCard from "@/app/(components)/Card/AlertInputAllInfo";
import NameCardSmallAndFull from "@/app/(components)/Card/NameCardSmallAndFull";
import SectionTitle from "@/app/(components)/CommonParts/SectionTitle";
import UpComing from "@/app/(components)/CommonParts/UpComing";
import ProspectDisplay from "@/app/(components)/ProspectsList/ID/ProspectDisplay";
import { useAddNewContext } from "@/app/(context)/AddNewOpenContext";
import { useMissingErrorFlagContext } from "@/app/(context)/MissingErrorFlagContext";
import { useTempolaryUserDataContext } from "@/app/(context)/TempolaryUserData";
import { getStatusColorFromProspect } from "@/lib/findStatusColor";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProspectInfo() {
  const userData = useUserInfoStore((state) => state.user);
  const clickedProspectData = useClickedProspectInfoStore((state) => state.prospect); //use clicked prospect's Information
  const {data: session, status} = useSession();
  const setUser = useUserInfoStore((state)=>state.setUser);
  const userReloadKey = useUserInfoStore((state)=>state.reloadKey);
  const clickedProspectReloadKey = useClickedProspectInfoStore((state)=>state.reloadKey)
  const {isEdit,changeIsEditStatus} = useAddNewContext();
  const {toHiddenProspect,changeToHiddenProspectState} = useTempolaryUserDataContext();
  const {isMissing} = useMissingErrorFlagContext();
  const setClickedProspectData = useClickedProspectInfoStore((state)=>state.setProspect);
  const router = useRouter(); 

  const [prospectColor,setProspectColor] = useState("#000000");
  const [isOpenFullPersonalInfo,setIsOpenFullPersonalInfo] = useState(false)
  const [isShownHideAlert,setIsShownHideAlert] = useState(false)

  useEffect(()=>{
    if(status==="authenticated" && session?.user?.id){
      const fetchUserInfo = async () => {
        try {
            const res = await fetch(`/api/prospects/${session.user.id}`); // Endpoint user's prospectslist
            const data = await res.json();
            
            setUser(data); // all user's info *except

        } catch (error) {
            console.error("Error fetching user's data:", error);
        }
      };

      fetchUserInfo();
    }
  },[session,status,setUser,userReloadKey])

  useEffect(()=>{
    if(clickedProspectData?.id && userData){
      const fetchProspectInfo = async () => {
        try{
          const res = await fetch(`/api/prospectList/${clickedProspectData.id}`);
          const {data} = await res.json();

          const updatedProspectData = {...data,prospectFirstcontact:new Date(data.prospectFirstcontact)}

          setClickedProspectData(updatedProspectData)
          setProspectColor(getStatusColorFromProspect(updatedProspectData,userData.statusSetting))
        } catch (error) {
          console.error("Error fetching prospect's data:", error);
        }
      } 

      fetchProspectInfo()
  }
  },[userData,clickedProspectData?.id,clickedProspectReloadKey])

  const showPersonalData = () => {
    if(!isEdit){
      setIsOpenFullPersonalInfo(!isOpenFullPersonalInfo)
    }
  }

  const clickedEditHandler = () => {
    changeIsEditStatus(!isEdit)
  }

  const clickedHideHandler = () => {
    setIsShownHideAlert(true)
  }

  const clickToHide = async () => {
    try{
      if(toHiddenProspect?.id){
        const res = await fetch(`/api/prospectList/${toHiddenProspect.id}`,{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prospectInfo:{...toHiddenProspect,prospectHidden:true}
          })
        })

        if (!res.ok){
          console.log("Error !!!")
          return null;
        };

      }

      changeToHiddenProspectState(null);
      setIsShownHideAlert(false);
      router.push("/prospectslist")  
    } catch (error) {
      console.error("Error fetching update Prospect info requests:", error);
      return null
    }
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

          {isMissing &&
            <AlertInputAllInfoCard/>
          }
          
        </>
      }
    </>
  );
}
