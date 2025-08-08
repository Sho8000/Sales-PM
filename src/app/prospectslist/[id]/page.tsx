"use client"

import { useClickedProspectInfoStore } from "@/store/clickedProspectsInfoStore";

export default function ProspectInfo() {

  const prospectData = useClickedProspectInfoStore();

  return (
    <>
      {prospectData &&
        <>
          <h1>{prospectData.prospect?.prospectName}</h1>
          <h1>{prospectData.prospect?.prospectEmail}</h1>
        </>
      }
    </>
  );
}
