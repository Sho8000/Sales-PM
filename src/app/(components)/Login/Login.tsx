"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import AlertCard from "../Card/AlertCard";
import AlertBtn from "../Btn/AlartBtn";
import Styles from "./login.module.css"

export default function UserLogin() {
  const [login, setLogin] = useState({
    useremail: "",
    password: "",
  });
  const [isShowIncorrectAlert,setIsShowIncorrectAlert] = useState(false);
  const [isShowNoInfoAlert,setIsShowNoInfoAlert] = useState(false);

  const loginHandler = async () => {
    if(!login.useremail || !login.password){
      setIsShowNoInfoAlert(true);
      return;
    }
    const result = await signIn("credentials",{
      useremail:login.useremail,
      password:login.password,
      redirect:false,
    })
    if (result?.ok === false) {
      setIsShowIncorrectAlert(true)
    } else {
      setLogin({useremail:'',password:''})
      window.location.href = "/prospectslist";
    }
  };

  const clickNoInfoAlertHandler = () => {
    setIsShowNoInfoAlert(false);
  }

  const clickIncorrectHandler = () => {
    setLogin({useremail:login.useremail,password:''})
    setIsShowIncorrectAlert(false)
  }

  return (
    <>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-60%]">
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
      </div>

      {isShowNoInfoAlert && 
        <AlertCard
          text="Your email or password was missing, please input !!"
          button1={<AlertBtn text="OK" clickFunction={clickNoInfoAlertHandler}/>}
        />
      }

      {isShowIncorrectAlert && 
        <AlertCard
          text="Your email or password was wrong, please input again!!"
          button1={<AlertBtn text="OK" clickFunction={clickIncorrectHandler}/>}
        />
      }

    </>
  );
}