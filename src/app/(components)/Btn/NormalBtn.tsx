"use client"

import Styles from "./BTN.module.css"

interface NormalBtnProps {
  text:"+Add New"|"+Add Note"|"Save";
  clickFunction: ()=>void;
  changeToPlus?:boolean;
}

export default function NormalBtn({text,clickFunction,changeToPlus=false}:NormalBtnProps) {

  return (
    <>
      {!changeToPlus?
        <button
          className={`
            ${Styles.btnSize} border-1 border-black
            ${text==="Save"?("bg-[#007BFF]"):("bg-[#00D323]")}
          `}
          onClick={clickFunction}
        >
          <p className={`text-white ${Styles.normalBtnFont}`}>{text}</p>
        </button>
        :<>
          <button
            className={`
              ${Styles.forPC}
              ${Styles.btnSize} border-1 border-black
              ${text==="Save"?("bg-[#007BFF]"):("bg-[#00D323]")}
            `}
            onClick={clickFunction}>
              <p className={`text-white ${Styles.normalBtnFont}`}>{text}</p>
          </button>
          <button
            className={`
              ${Styles.forPhone}
              ${Styles.btnSize} border-1 border-black
              ${text==="Save"?("bg-[#007BFF]"):("bg-[#00D323]")}
            `}
            onClick={clickFunction}>
              {text==="Save"?
                <p className={`text-white ${Styles.normalBtnFont}`}>{text}</p>
                :<p className={`text-white ${Styles.fontForPlus}`}>+</p>
              }
          </button>
        </>
      }

    </>
  );
}