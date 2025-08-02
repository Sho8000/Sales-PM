"use client"

import Styles from "./BTN.module.css"

type SettingType = "Status & Color" | "Contents" | "Hidden List" | "Password";

interface SettingsBtnProps {
  text:SettingType;
  clickFunction: ()=>void;
}

export default function SettingBtn({text,clickFunction}:SettingsBtnProps) {

  return (
    <button
      className={`${Styles.settingBtnSize} bg-[#E0E0E0]`}
      onClick={clickFunction}>
        <p className={`${Styles.settingBtnFont}`}>{text}</p>
    </button>
  );
}