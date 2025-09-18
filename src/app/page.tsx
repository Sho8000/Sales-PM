"use client"

import HomeSectionTemplate from "./(components)/Home/HomeSectionTemplate";
import HomeTitle from "./(components)/Home/Maintitle";
import SubTitle from "./(components)/Home/Subtitle";
import allProspectImgPC from "@/../public/Home/AllProspectImg.png"
import allProspectImgPhone from "@/../public/Home/AllProspectImgPhone.jpg"
import noteImgPC from "@/../public/Home/NoteImgPC.jpg"
import noteImgPhone from "@/../public/Home/NoteImgPhone.jpg"

export default function Home() {

  return (
    <>
      <section className="pt-[1rem] pb-[3rem]">
        <div>
          <HomeTitle text="Sales-PM"/>
          <SubTitle/>
        </div>
      </section>
      <section
        className="
        py-[1rem]
        bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ebf9ff_10%,_#ebf9ff_90%,_#ffffff_100%)] pt-[6vh] pb-[8vh] -mt-[6vh] -mb-[8vh]
        "
      >
        <HomeSectionTemplate titleText="Organize Prospects" message={`You can add your prospects information with "Status" and "Contents". You can use "Status" for how urgent it is, and you can check the emergency level with color, "Contents" for about topics the clients are interested. You can customize each items what you need.`} imagePC={allProspectImgPC} imagePhone={allProspectImgPhone}/>
      </section>
      <section
        className="pt-[3rem] pb-[1rem] mb-[1rem]"
      >
        <HomeSectionTemplate titleText="Note Management" imageL={true} message={`You can create multiple notes under the prospect's information. In adition, you can memo what you talked with your clients under that notes, so you can track those history. If a prospect brings up a new topic, simply add a note under a separate content.`} imagePC={noteImgPC} imagePhone={noteImgPhone}/>
      </section>
    </>
  );
}
