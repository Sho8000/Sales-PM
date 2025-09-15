"use client"

import { useMissingErrorFlagContext } from "@/app/(context)/MissingErrorFlagContext";
import AlertBtn from "../Btn/AlartBtn";
import ModalPortal from "../Setting/ModalPortal";
import AlertCard from "./AlertCard";

export default function AlertInputAllInfoCard() {
  const {changeIsMissingStatus} = useMissingErrorFlagContext();

  return (
    <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
      <ModalPortal
        showTopItem={
          <AlertCard
            text="Please input all information!!"
            button1={<AlertBtn text="OK" clickFunction={()=>{changeIsMissingStatus(null)}}/>}
          />
        }
      />
    </div>
  );
}