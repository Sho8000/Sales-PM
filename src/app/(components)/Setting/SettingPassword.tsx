import { useState } from "react";
import NormalBtn from "../Btn/NormalBtn";
import Styles from "./Setting.module.css"

export default function SettingPassword() {
  const [currentPassword,setCurrentPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [passwordConfirm,setPasswordConfirm] = useState("")

  const clickPassSaveHandler = () => {
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










/* 

<>
<div className='max-w-3xl m-auto border-1 border-black rounded-md'>
  <div className='px-[1rem] py-[0.5rem] bg-[#FFCE47] border-dashed border-b-1 border-black rounded-t-md'>
    <p className='font-bold'>Change the Password</p>
    {isPassNotFilled.length > 0 && 
      <p className='text-red-500 pb-[0.5rem] text-sm'>*{isPassNotFilled}</p>
    }
  </div>
  <div className='w-full border-b-1 border-gray-400 border-dashed'>
    <input className='mx-[1rem] my-[0.5rem] px-[1rem] rounded-sm border-1 border-gray-500 bg-[#EDEDED]' type="password" placeholder='Current Password' value={newInstructorInfo.currentPassword} onChange={(e) => setNewInstructorInfo({ ...newInstructorInfo, currentPassword: e.target.value })}/>
    {currentPassError && 
      <p className='mx-[1rem] text-red-500 pb-[0.5rem] text-sm'>*Input correct password</p>
    }
  </div>
  <div className='flex flex-col'>
    <div>
      <input className='mx-[1rem] my-[0.5rem] px-[1rem] rounded-sm border-1 border-gray-500 bg-[#EDEDED]' type="password" placeholder='New Password' value={newInstructorInfo.newPassword} onChange={(e) => setNewInstructorInfo({ ...newInstructorInfo, newPassword: e.target.value })}/>
      <input className='mx-[1rem] my-[0.5rem] px-[1rem] rounded-sm border-1 border-gray-500 bg-[#EDEDED]' type="password" placeholder='New Password Confirmation' minLength={8} value={newInstructorInfo.newPassConfirm} onChange={(e) => setNewInstructorInfo({ ...newInstructorInfo, newPassConfirm: e.target.value })}/>
    </div>
    {newPassError && 
      <p className='mx-[1rem] text-red-500 pb-[0.5rem] text-sm'>*{newPassError}</p>
    }
  </div>
</div>      

<div className='w-[50%] m-auto min-w-[150px]'>
  <Button
    className={`${styles.button} mt-[0.5rem]`} onClick={changePasswordHandler}
  >
    Click to Change
  </Button> 
</div>
</>
 */