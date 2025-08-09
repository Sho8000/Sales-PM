"use client"

import SectionTitle from "@/app/(components)/CommonParts/SectionTitle";
import UpComing from "@/app/(components)/CommonParts/UpComing";
import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";

export default function ProspectInfo() {

  const prospectData = useClickedProspectInfoStore();

  return (
    <>
      {prospectData &&
        <>
          <SectionTitle text={"Prospect Info"}
             
          />
          <UpComing text="Appointment"/>
        
          <h1>{prospectData.prospect?.prospectName}</h1>
          <h1>{prospectData.prospect?.prospectEmail}</h1>
        </>
      }
    </>
  );
}
