"use client"

import Styles from "./Card.module.css"

interface AlertCardProps {
  text:string;
  button1: React.ReactNode;
  button2?: React.ReactNode;
}

export default function AlertCard({text,button1,button2}:AlertCardProps) {

  return (
    <div className="fixed top-0 left-0 bg-black/50 w-full h-full">
      <div className={`absolute w-[50%] min-w-[300px] flex flex-col items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white ${Styles.alartCardConponent}`}>
        <p className={`${Styles.textFont}`}>{text}</p>
        <div className="w-full flex justify-around">
          {button1}
          {button2}
        </div>
      </div>
    </div>
  );
}