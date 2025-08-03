"use client"

import SectionTitle from "../(components)/CommonParts/SectionTitle";
import NormalBtn from "../(components)/Btn/NormalBtn";
import UpComing from "../(components)/CommonParts/UpComing";

export default function ProspectsList() {

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
    </>
  );
}
