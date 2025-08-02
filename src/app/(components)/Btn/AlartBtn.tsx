"use client"

import Styles from "./BTN.module.css"

interface AlertBtnProps {
  text:"OK"|"Cancel"|"Delete";
  clickFunction: ()=>void;
  changeToPlus?:boolean;
}

export default function AlertBtn({text,clickFunction}:AlertBtnProps) {

  return (
    <button
      className={`
        ${Styles.btnSize} border-1 border-black
        ${text!=="Cancel"?("bg-[#FF3131]"):("bg-[#00D323]")}
      `}
      onClick={clickFunction}
    >
      <p className={`text-white ${Styles.normalBtnFont}`}>{text}</p>
    </button>
  );
}