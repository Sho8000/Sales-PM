"use client"

import SectionTitle from "../(components)/CommonParts/SectionTitle";
import NormalBtn from "../(components)/Btn/NormalBtn";
import UpComing from "../(components)/CommonParts/UpComing";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserInfoStore } from "@/store/userInfoStore";
import SimpleCard from "../(components)/Card/SimpleSmallCard";
import { getStatusColorFromNote, getStatusColorFromProspect } from "@/lib/findStatusColor";

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

      {/* test simple card for prospect */}
      <div className="flex flex-col gap-[1rem]">
        {userData?.prospectList?.prospects.map((prospectData,index)=>{
          const color = getStatusColorFromProspect(prospectData,userData.statusSetting);

          return <SimpleCard key={index} prospectData={prospectData} color={color}/>
        })}
      </div>

      {/* test simple card for notes */}
      <div className="flex flex-col gap-[1rem]">
        {userData?.prospectList?.prospects[0].notes.map((noteData,index)=>{
          const color = getStatusColorFromNote(noteData,userData.statusSetting);

          return <SimpleCard key={index} noteData={noteData} color={color}/>
        })}
      </div>

    </>
  );
}
