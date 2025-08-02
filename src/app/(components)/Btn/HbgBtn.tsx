"use client"

import { useEffect, useState } from "react";
import Styles from "./BTN.module.css"

interface HbgBtnProps {
  clicked?:boolean;
  clickFunction: ()=>void;
}

export default function HbgBtn({clicked=false,clickFunction}:HbgBtnProps) {
  const [hbgColor,setHbgColor] = useState("white");

  useEffect(()=>{
    if(clicked){
      setHbgColor("#007BFF")
    } else{
      setHbgColor("white")
    }
  },[clicked])

  return (
    <>
      {/* Middle */}
      <button className={`${Styles.hideMiddle} cursor-pointer`} onClick={clickFunction}>
        <svg width="36" height="30">
          <line x1="0" y1="3" x2="36" y2="3" style={{stroke:hbgColor,strokeWidth:3,strokeLinecap: "round"}}/>
          <line x1="0" y1="15" x2="36" y2="15" style={{stroke:hbgColor,strokeWidth:3,strokeLinecap: "round"}}/>
          <line x1="0" y1="27" x2="36" y2="27" style={{stroke:hbgColor,strokeWidth:3,strokeLinecap: "round"}}/>
        </svg>  
      </button>

      {/* Small */}
      <button className={`${Styles.hideSmall} cursor-pointer`} onClick={clickFunction}>
        <svg width="24" height="20">
          <line x1="0" y1="1" x2="24" y2="1" style={{stroke:hbgColor,strokeWidth:2,strokeLinecap: "round"}}/>
          <line x1="0" y1="10" x2="24" y2="10" style={{stroke:hbgColor,strokeWidth:2,strokeLinecap: "round"}}/>
          <line x1="0" y1="19" x2="24" y2="19" style={{stroke:hbgColor,strokeWidth:2,strokeLinecap: "round"}}/>
        </svg>  
      </button>
    </>
  );
}