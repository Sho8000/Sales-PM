"use client"

import SettingBtn from "../Btn/SettingBtn";

export default function SettingMenu() {

  const settingStatusBtn = () => {
    console.log("clicked settingStatus")
  }

  const settingContentBtn = () => {
    console.log("clicked settingContent")
  }
  const settingHiddenBtn = () => {
    console.log("clicked settingHidden")
  }
  const settingPassBtn = () => {
    console.log("clicked settingPass")
  }

  return (
    <div className={`flex flex-col gap-[2rem] justify-center items-center pb-[2rem]`}>
      <SettingBtn text="Status & Color" clickFunction={settingStatusBtn}/>
      <SettingBtn text="Contents" clickFunction={settingContentBtn}/>
      <SettingBtn text="Hidden List" clickFunction={settingHiddenBtn}/>
      <SettingBtn text="Password" clickFunction={settingPassBtn}/>
    </div>
  );
}
