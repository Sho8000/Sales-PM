"use client";

import { useState } from "react";
import AlertCard from "../Card/AlertCard";
import AlertBtn from "../Btn/AlartBtn";
import Styles from "./login.module.css"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [signUp, setSignUp] = useState({
    username:"",
    useremail: "",
    password: "",
    adminEmail:""
  });
  const [isShowIncorrectAlert,setIsShowIncorrectAlert] = useState(false);
  const [isShowNoInfoAlert,setIsShowNoInfoAlert] = useState(false);
  const router = useRouter();

  const signupHandler = async () => {
    try{
      if(!signUp.username || !signUp.useremail || !signUp.password || !signUp.adminEmail){
        setIsShowNoInfoAlert(true);
        return;
      }

      const res = await fetch(`/api/signup`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signupInfo:signUp
        })
      })

      if (!res.ok){
        setIsShowIncorrectAlert(true)
        return null;
      };

      setSignUp({
        username:"",
        useremail:"",
        password:"",
        adminEmail:""
      })

      const result = await signIn("credentials",{
        useremail:signUp.useremail,
        password:signUp.password,
        redirect:false,
      })
      if (result?.ok === false) {
        setIsShowIncorrectAlert(true)
      }

      router.push("/prospectslist")

    } catch (error) {
      console.error("Error fetching post new user info requests:", error);
      return null
    }
  };

  const clickNoInfoAlertHandler = () => {
    setIsShowNoInfoAlert(false);
  }

  const incorrectAlertHandler = () => {
    setIsShowIncorrectAlert(false)
    setSignUp({...signUp,adminEmail:""})
  }

  return (
    <>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-60%]">
        <div
          className={`w-[40vw] min-w-[320px] h-auto flex flex-col justify-around gap-[1rem] rounded-lg p-8 bg-white border-1 border-black shadow-md`} // Applying the new class
        >
          <h2 className={`${Styles.titleFont} font-bold text-center`}>SignUp</h2>
          <input
            className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
            type="text"
            placeholder="user name"
            value={signUp.username}
            onChange={(e)=> setSignUp({ ...signUp,username:e.target.value})}
            required
          />
          <input
            className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
            type="Email"
            placeholder="userEmail@sample.com"
            value={signUp.useremail}
            onChange={(e)=> setSignUp({ ...signUp,useremail:e.target.value})}
            required
          />
          <input
            className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
            type="password"
            placeholder="password"
            value={signUp.password}
            onChange={(e)=>setSignUp({...signUp,password:e.target.value})}
            required
          />
          <input
            className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
            type="password"
            placeholder="adminEmail"
            value={signUp.adminEmail}
            onChange={(e)=>setSignUp({...signUp,adminEmail:e.target.value})}
            required
          />
          <button
            className={`rounded-sm p-[10px] bg-[#0a0a0a] text-[#ededed] ${Styles.loginFont}`}
            onClick={signupHandler}
          >
            Sign Up
          </button>
        </div>
      </div>

      {isShowNoInfoAlert && 
        <AlertCard
          text="Please fill all information!!"
          button1={<AlertBtn text="OK" clickFunction={clickNoInfoAlertHandler}/>}
        />
      }

      {isShowIncorrectAlert && 
        <AlertCard
          text="The adminEmail is wrong or empty,,,"
          button1={<AlertBtn text="OK" clickFunction={incorrectAlertHandler}/>}
        />
      }

    </>
  );
}