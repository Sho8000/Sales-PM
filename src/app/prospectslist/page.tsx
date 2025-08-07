"use client"

import SectionTitle from "../(components)/CommonParts/SectionTitle";
import NormalBtn from "../(components)/Btn/NormalBtn";
import UpComing from "../(components)/CommonParts/UpComing";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserInfoStore } from "@/store/userInfoStore";
import FilterAndDisplayArea from "../(components)/ProspectsList/Fliter_DisplayArea";

export default function ProspectsList() {
  const {data: session, status} = useSession();
  const setUser = useUserInfoStore((state)=>state.setUser);

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
  },[session,status,setUser])

  const clickAddNewHandler = () => {
    console.log("add New")
  }

  const clickUpcoming = () => {
    console.log("clicked upcoming!")
  }

  return (
    <>
      <SectionTitle text={"Prospects List"}
        button={<NormalBtn text="+Add New" clickFunction={clickAddNewHandler} changeToPlus={true}/>}
      />
      <UpComing text="Upcoming" clickFunction={clickUpcoming}/>
      <FilterAndDisplayArea/>
    </>
  );
}
