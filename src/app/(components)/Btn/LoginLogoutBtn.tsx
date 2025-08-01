"use client"

import Styles from "./BTN.module.css"

interface LoginLogoutBtnProps {
  text:"Login"|"Logout";
  clickFunction: ()=>void;
}

export default function LoginLogoutBtn({text,clickFunction}:LoginLogoutBtnProps) {

  return (
    <button
      className={`
        ${Styles.btnSize}
        ${text==="Login"?("bg-[#00D323]"):("bg-[#FF3131]")}
      `}
      onClick={clickFunction}>
        <p className={`text-white ${Styles.loginOutbtnFont}`}>{text}</p>
    </button>
  );
}