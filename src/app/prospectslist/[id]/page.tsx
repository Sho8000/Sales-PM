"use client"

import SimpleCard from "@/app/(components)/Card/SimpleSmallCard";
import SectionTitle from "@/app/(components)/CommonParts/SectionTitle";
import UpComing from "@/app/(components)/CommonParts/UpComing";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";

export default function ProspectInfo() {

  const clickedProspectData = useClickedProspectInfoStore((state) => state.prospect); //use clicked prospect's Information

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
          <SimpleCard prospectData={clickedProspectData} clickFunctionReceiveProspect={showPersonalData}/>
        </>
      }
    </>
  );
}
