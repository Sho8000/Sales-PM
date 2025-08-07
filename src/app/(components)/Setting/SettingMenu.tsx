"use client"

import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";
import SettingBtn from "../Btn/SettingBtn";

export default function SettingMenu() {
  const {changeSettingMenuStatus,changeSettingStatusPageStatus,changeSettingContentStatus,changeSettingHiddenStatus,changeSettingPasswordStatus} = useSettingPageContext();

  const settingStatusBtn = () => {
    changeSettingMenuStatus(false);
    changeSettingStatusPageStatus(true);
  }

  const settingContentBtn = () => {
    changeSettingMenuStatus(false);
    changeSettingContentStatus(true);
  }
  const settingHiddenBtn = () => {
    changeSettingMenuStatus(false);
    changeSettingHiddenStatus(true);
  }
  const settingPassBtn = () => {
    changeSettingMenuStatus(false);
    changeSettingPasswordStatus(true);
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
