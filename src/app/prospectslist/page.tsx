"use client"

import SectionTitle from "../(components)/CommonParts/SectionTitle";
import NormalBtn from "../(components)/Btn/NormalBtn";
import UpComing from "../(components)/CommonParts/UpComing";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserInfoStore } from "@/store/userInfoStore";
import FilterAndDisplayArea from "../(components)/ProspectsList/Fliter_DisplayArea";
import { Prospects } from "@/lib/dbInterface";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";
import { useRouter } from "next/navigation";
import { useAddNewContext } from "../(context)/AddNewOpenContext";
import AddNewTemplate from "../(components)/Card/AddNewTemplate";

export default function ProspectsList() {
  const router = useRouter();
  const {data: session, status} = useSession();
  const setUser = useUserInfoStore((state)=>state.setUser);
  const userReloadKey = useUserInfoStore((state)=>state.reloadKey);
  const setClickedProspectData = useClickedProspectInfoStore((state)=>state.setProspect);
  const {isAddNewPage,changeAddNewPageStatus} = useAddNewContext();

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

  const clickAddNewHandler = () => {
    changeAddNewPageStatus(true);
  }

  const clickUpcoming = (prospectInfo:Prospects) => {
    setClickedProspectData(prospectInfo)
    router.push(`/prospectslist/${prospectInfo.id}`)
  }

  return (
    <>
      <SectionTitle text={"Prospects List"}
        button={<NormalBtn text="+Add New" clickFunction={clickAddNewHandler} changeToPlus={true}/>}
      />
      <UpComing text="Upcoming" clickFunction={clickUpcoming}/>
      <FilterAndDisplayArea/>

      {isAddNewPage &&
        <AddNewTemplate text="New Prospect"/>
      }
    </>
  );
}
