import { useState } from "react";
import NormalBtn from "../Btn/NormalBtn";
import Styles from "./Setting.module.css"
import { useUserInfoStore } from "@/store/userInfoStore";
import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";

export default function SettingPassword() {
  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const { changeSettingPageStatus,changeSettingMenuStatus,changeSettingStatusPageStatus,changeSettingContentStatus,changeSettingHiddenStatus,changeSettingPasswordStatus} = useSettingPageContext();


  const [currentPassword,setCurrentPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [passwordConfirm,setPasswordConfirm] = useState("")

  const clickPassSaveHandler = async () => {
    if(!currentPassword || !newPassword || !passwordConfirm){
      console.log("please input all information!!")
      return
    }

    if(newPassword !== passwordConfirm){
      console.log("New Password and Password Confirm is different!!")
      setNewPassword("");
      setPasswordConfirm("");
      return
    }

    if(currentPassword === newPassword){
      console.log("Current Password and New Password are same!!")
      setNewPassword("");
      setPasswordConfirm("");
      return
    }

    try {
      if(userData?.id){
        const res = await fetch(`api/user/${userData?.id}`,{
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword:currentPassword,
            newPassword:newPassword,
          }),
        });

        if (!res.ok){
          console.log("Error !!!")
          return;
        };

        setCurrentPassword("")
        setNewPassword("")
        setPasswordConfirm("")

        /* close Settingpage */
        changeSettingPageStatus(false)
        changeSettingMenuStatus(false)
        changeSettingStatusPageStatus(false)
        changeSettingContentStatus(false)
        changeSettingHiddenStatus(false)
        changeSettingPasswordStatus(false)    
      }

    } catch (error) {
      console.error("Error fetching change password requests:", error);
    }
  }

  return (
    <div className={`w-[90%] m-auto pb-[2rem]`}>
      {/* Title */}
      <div className="flex justify-between items-center mb-[2rem]">
        <h2 className={`${Styles.settingTitleFont}`}>Password</h2>
      </div>

      {/* Each Items */}
      <div className="w-full flex flex-col gap-[1rem]">
        <div className={`flex gap-y-[0.5rem] ${Styles.smallLayout}`}>
          <h2 className={`${Styles.itemsFont} text-[#808080] basis-1/2`}>Current Password :</h2>
          <input
            className={`grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout}`}
            type="password"
            placeholder='Current Password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword( e.target.value )}
          />
        </div>

        <div className={`w-full bg-gray-300 my-[1rem] ${Styles.devidingBar}`}></div>

        <div className={`flex gap-y-[0.5rem] ${Styles.smallLayout}`}>
          <h2 className={`${Styles.itemsFont} text-[#808080] basis-1/2`}>New Password :</h2>
          <input
            className={`grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout}`}
            type="password"
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword( e.target.value )}
          />
        </div>
        <div className={`flex gap-y-[0.5rem] ${Styles.smallLayout} mb-[1rem]`}>
          <h2 className={`${Styles.itemsFont} text-[#808080] basis-1/2`}>Password Confirm :</h2>
          <input
            className={`grow pl-[1rem] py-[0.5rem] ${Styles.placeholderFont} ${Styles.inputLayout}`}
            type="password"
            placeholder='Password Confirm'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm( e.target.value )}
          />
        </div>
      </div>

      {/* Save Btn*/}
      <div className="w-full text-center mt-[2rem]">
        <NormalBtn text="Save" clickFunction={clickPassSaveHandler}/>
      </div>
    </div>
  );
}
