import { useState } from "react";
import NormalBtn from "../Btn/NormalBtn";
import Styles from "./Setting.module.css"
import { useUserInfoStore } from "@/store/userInfoStore";
import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";
import ModalPortal from "./ModalPortal";
import AlertCard from "../Card/AlertCard";
import AlertBtn from "../Btn/AlartBtn";

export default function SettingPassword() {
  const userData = useUserInfoStore((state) => state.user); //use user's all Information
  const { changeSettingPageStatus,changeSettingMenuStatus,changeSettingStatusPageStatus,changeSettingContentStatus,changeSettingHiddenStatus,changeSettingPasswordStatus} = useSettingPageContext();


  const [currentPassword,setCurrentPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [passwordConfirm,setPasswordConfirm] = useState("")
  const [wrongPass,setWrongPass] = useState(false)
  const [errorNotFilled,setErrorNotFilled] = useState(false)
  const [errorSamePassInput,setErrorSamePassInput] = useState(false)
  const [errorPassMismatch,setErrorPassMismatch] = useState(false)
  const [alertChangedPass,setAlertChangedPass] = useState(false);

  const clickPassSaveHandler = async () => {
    if(!currentPassword || !newPassword || !passwordConfirm){
      setErrorNotFilled(true);
      return
    }

    if(newPassword !== passwordConfirm){
      setErrorPassMismatch(true);
      return
    }

    if(currentPassword === newPassword){
      setErrorSamePassInput(true)
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
          setWrongPass(true)
          return;
        };

        setAlertChangedPass(true)
      }

    } catch (error) {
      console.error("Error fetching change password requests:", error);
    }
  }

  const alertCloseHandler = () => {
    setErrorNotFilled(false)

    if(wrongPass){
      setWrongPass(false)
      setCurrentPassword("")
    }

    if(errorPassMismatch || errorSamePassInput){
      setErrorPassMismatch(false)
      setErrorSamePassInput(false)
    }
    
    if(alertChangedPass){
      setAlertChangedPass(false)

      setCurrentPassword("")
      /* close Settingpage */
      changeSettingPageStatus(false)
      changeSettingMenuStatus(false)
      changeSettingStatusPageStatus(false)
      changeSettingContentStatus(false)
      changeSettingHiddenStatus(false)
      changeSettingPasswordStatus(false)    
    }

    setNewPassword("")
    setPasswordConfirm("")

  }

  return (
    <>
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

      {wrongPass &&
        <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
          <ModalPortal showTopItem={
              <AlertCard
                text="Your current password is wrong,,,"
                button1={
                  <AlertBtn
                    text="OK"
                    clickFunction={()=>{
                      alertCloseHandler()
                    }}/>
                }
              />
            }
          />
        </div>
      }

      {errorNotFilled &&
        <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
          <ModalPortal showTopItem={
              <AlertCard
                text="Please input all information!!"
                button1={
                  <AlertBtn
                    text="OK"
                    clickFunction={()=>{
                      alertCloseHandler()
                    }}/>
                }
              />
            }
          />
        </div>
      }

      {errorPassMismatch &&
        <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
          <ModalPortal showTopItem={
              <AlertCard
                text="New Password and Password Confirm is different!!"
                button1={
                  <AlertBtn
                    text="OK"
                    clickFunction={()=>{
                      alertCloseHandler()
                    }}/>
                }
              />
            }
          />
        </div>
      }

      {errorSamePassInput &&
        <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
          <ModalPortal showTopItem={
              <AlertCard
                text="Current Password and New Password are same!!"
                button1={
                  <AlertBtn
                    text="OK"
                    clickFunction={()=>{
                      alertCloseHandler()
                    }}/>
                }
              />
            }
          />
        </div>
      }

      {alertChangedPass &&
        <div className="w-[100vw] h-[100vh] bg-black/80 top-0 left-0 z-50 fixed">
          <ModalPortal showTopItem={
              <AlertCard
                text="Your Password was changed!"
                button1={
                  <AlertBtn
                    text="OK"
                    oppositColor={true}
                    clickFunction={()=>{
                      alertCloseHandler()
                    }}/>
                }
              />
            }
          />
        </div>
      }
    </>
  );
}
