"use client"

import SectionTitle from "../(components)/CommonParts/SectionTitle";
import NormalBtn from "../(components)/Btn/NormalBtn";
import UpComing from "../(components)/CommonParts/UpComing";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserInfoStore } from "@/store/userInfoStore";

export default function ProspectsList() {
  const {data: session, status} = useSession();
  const setUser = useUserInfoStore((state)=>state.setUser);
  const userData = useUserInfoStore((state) => state.user); //use user's all Information

  useEffect(()=>{
    if(status==="authenticated" && session?.user?.id){
      const fetchUserInfo = async () => {
        try {
            const res = await fetch(`/api/prospects/${session.user.id}`); // Endpoint user's prospectslist
            const data = await res.json();
            
            setUser(data); // all user's info *except

//            console.log("data",data)
//            console.log("data, age",data.prospectList.prospects[0].prospectAge)

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

      <h1>All Datas</h1>
      <h1>{userData?.id}</h1>
      <h1>{userData?.password}</h1>
      <h1>{userData?.prospectList?.prospects[0].prospectEmail}</h1>
    </>
  );
}
