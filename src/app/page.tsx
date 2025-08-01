"use client"

import CloseBtn from "./(components)/Btn/CloseBtn";
import LoginLogoutBtn from "./(components)/Btn/LoginLogoutBtn";

export default function Home() {

  const test = () => {
    console.log("Test")
  }

  const LoginLogout = () => {
    console.log("Login/Logout")
  }

  return (
    <section className="bg-pink-400">
      <CloseBtn clickFunction={test}/>
      <LoginLogoutBtn text="Login" clickFunction={LoginLogout}/>
      <LoginLogoutBtn text="Logout" clickFunction={LoginLogout}/>
    </section>
  );
}
