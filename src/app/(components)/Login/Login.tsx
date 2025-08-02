"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
/* import AlertCard from "../Cards/AlertCard";
import { useAlertContext } from "@/app/(context)/AlertContext";
 */
import Styles from "./login.module.css"

export default function UserLogin() {
  const [login, setLogin] = useState({
    useremail: "",
    password: "",
  });



/*   const {isShowAlert,message,changeAlertStatus,addMsg} = useAlertContext()
 */

  const loginHandler = async () => {
    const result = await signIn("credentials",{
      useremail:login.useremail,
      password:login.password,
      redirect:false,
    })
    if (result?.ok === false) {
/*       addMsg("Email or Password was wrong,,,")
      changeAlertStatus(true) */
      setLogin({useremail:'',password:''})
    } else {
      setLogin({useremail:'',password:''})
      window.location.href = "/prospectslist";
    }
  };

  return (
    <>
      <div
        className={`w-[40vw] min-w-[320px] h-auto flex flex-col justify-around gap-[1rem] rounded-lg p-8 bg-white border-1 border-black shadow-md`} // Applying the new class
      >
        <h2 className={`${Styles.titleFont} font-bold text-center`}>Login</h2>
        <input
          className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
          type="Email"
          placeholder="yourEmail@sample.com"
          value={login.useremail}
          onChange={(e)=> setLogin({ ...login,useremail:e.target.value})}
          required
        />
        <input
          className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
          type="password"
          placeholder="password"
          value={login.password}
          onChange={(e)=>setLogin({...login,password:e.target.value})}
          required
        />
        <button
          className={`rounded-sm p-[10px] bg-[#0a0a0a] text-[#ededed] ${Styles.loginFont}`}
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
{/* 
      {isShowAlert && 
        <AlertCard message={message}/>
      }
 */}
    </>
  );
}