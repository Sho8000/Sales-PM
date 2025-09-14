"use client"

import Styles from "./BTN.module.css"

interface AlertBtnProps {
  text:"OK"|"Cancel"|"Delete";
  oppositColor?:boolean;
  clickFunction: ()=>void;
  changeToPlus?:boolean;
}

export default function AlertBtn({text,oppositColor=false,clickFunction}:AlertBtnProps) {

  return (
    <button
      className={`
        ${Styles.btnSize} border-1 border-black
        ${!oppositColor ? text!=="Cancel"?
          ("bg-[#FF3131]"):("bg-[#00D323]"):text!=="Cancel"?("bg-[#00D323]"):("bg-[#FF3131]")}
        }`}
      onClick={clickFunction}
    >
      <p className={`text-white ${Styles.normalBtnFont}`}>{text}</p>
    </button>
  );
}