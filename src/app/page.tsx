"use client"

import CloseBtn from "./(components)/Btn/CloseBtn";
import LoginLogoutBtn from "./(components)/Btn/LoginLogoutBtn";
import NormalBtn from "./(components)/Btn/NormalBtn";

export default function Home() {

  const test = () => {
    console.log("Test")
  }

  const LoginLogout = () => {
    console.log("Login/Logout")
  }

  const normalBtntest = () => {
    console.log("noramlTest")
  }

  return (
    <section className="bg-pink-400">
      <CloseBtn clickFunction={test}/>
      <LoginLogoutBtn text="Login" clickFunction={LoginLogout}/>
      <LoginLogoutBtn text="Logout" clickFunction={LoginLogout}/>
      <NormalBtn text="+Add New" clickFunction={normalBtntest}/>
      <NormalBtn text="+Add Note" clickFunction={normalBtntest}/>
      <NormalBtn text="Save" clickFunction={normalBtntest}/>
      <div className="flex">
        <NormalBtn text="+Add New" clickFunction={normalBtntest} changeToPlus={true}/>
        <NormalBtn text="+Add Note" clickFunction={normalBtntest} changeToPlus={true}/>
        <NormalBtn text="Save" clickFunction={normalBtntest} changeToPlus={true}/>
      </div>
    </section>
  );
}
