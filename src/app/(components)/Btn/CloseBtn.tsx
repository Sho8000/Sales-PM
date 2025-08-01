"use client"

import Styles from "./BTN.module.css"

interface CloseBtnProps {
  clickFunction: ()=>void;
}

export default function CloseBtn({clickFunction}:CloseBtnProps) {

  return (
    <>
      {/* Large */}
      <button className={`${Styles.hideLarge} cursor-pointer`} onClick={clickFunction}>
        <svg width="100" height="100">
          <circle cx={50} cy={50} r={47} fill="white" opacity="80%" stroke="black" strokeWidth={3}/>
          <line x1="23" y1="23" x2="77" y2="77" style={{stroke:"black",strokeWidth:8,strokeLinecap: "round"}}/>
          <line x1="23" y1="77" x2="77" y2="23" style={{stroke:"black",strokeWidth:8,strokeLinecap: "round"}}/>
        </svg>  
      </button>

      {/* Middle */}
      <button className={`${Styles.hideMiddle} cursor-pointer`} onClick={clickFunction}>
        <svg width="74" height="74">
          <circle cx={37} cy={37} r={35} fill="white" opacity="80%" stroke="black" strokeWidth={2}/>
          <line x1="20" y1="20" x2="54" y2="54" style={{stroke:"black",strokeWidth:6,strokeLinecap: "round"}}/>
          <line x1="20" y1="54" x2="54" y2="20" style={{stroke:"black",strokeWidth:6,strokeLinecap: "round"}}/>
        </svg>  
      </button>

      {/* Small */}
      <button className={`${Styles.hideSmall} cursor-pointer`} onClick={clickFunction}>
        <svg width="50" height="50">
          <circle cx={25} cy={25} r={24} fill="white" opacity="80%" stroke="black" strokeWidth={1}/>
          <line x1="15" y1="15" x2="35" y2="35" style={{stroke:"black",strokeWidth:4,strokeLinecap: "round"}}/>
          <line x1="15" y1="35" x2="35" y2="15" style={{stroke:"black",strokeWidth:4,strokeLinecap: "round"}}/>
        </svg>  
      </button>
    </>
  );
}