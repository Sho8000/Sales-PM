"use client"

import { usePathname } from "next/navigation";
import Styles from "./Nav.module.css"
import HbgBtn from "../Btn/HbgBtn";
import LoginLogoutBtn from "../Btn/LoginLogoutBtn";
import { useState } from "react";
import Image from "next/image";

import settingIcon from "@/../public/Nav/settings.svg"
import homeIcon from "@/../public/Nav/homeIcon_80_80.png"

export default function Navbar() {
  const pathName = usePathname();
  const [isHbgBtnClicked, setIsHbgBtnClicked] = useState(false);

  const loginHandler = () => {
    console.log("Login clicked!!")
  }

  const logoutHandler = () => {
    console.log("Logout clicked!!")
  }

  const homeIconHandler = () => {
    console.log("Home clicked!!")
  }

  const SettingIconHandler = () => {
    console.log("Setting clicked!!")
  }

  const hbgBtnHandler = () => {
    setIsHbgBtnClicked(!isHbgBtnClicked)
  }

  return (
    <>
      <nav className={`flex justify-between items-center w-full bg-black text-white ${Styles.navArea} ${Styles.navTitleFont}`}>
        {/* Nav Left */}
        <div>
          <h1 className="font-bold">Sales-PM</h1>
        </div>
        {/* Nav Right */}
        {pathName==="/"?
          <LoginLogoutBtn text="Login" clickFunction={loginHandler}/>
          :<>
            <div className={`flex gap-[2rem] items-center ${Styles.forPC}`}>
              <Image
                className={`${Styles.NavIconSize}`}
                onClick={homeIconHandler}
                src={homeIcon}
                alt="home"
                width={80}
                height={80}
              />
              <Image
                className={`${Styles.NavIconSize}`}
                onClick={SettingIconHandler}
                src={settingIcon}
                alt="setting"
                width={80}
                height={80}
              />
              <LoginLogoutBtn text="Logout" clickFunction={logoutHandler}/>
            </div>
            <div className={`${Styles.forPhone}`}>
              <HbgBtn clickFunction={hbgBtnHandler} clicked={isHbgBtnClicked}/>
            </div>
          </>
        }
      </nav>
      {isHbgBtnClicked &&
        <div className={`flex justify-around bg-black translate-y-[-1px] border-black pb-[1rem] ${Styles.forPhone}`}>
          <Image
            className={`${Styles.NavIconSize}`}
            onClick={homeIconHandler}
            src={homeIcon}
            alt="home"
            width={80}
            height={80}
          />
          <Image
            className={`${Styles.NavIconSize}`}
            onClick={SettingIconHandler}
            src={settingIcon}
            alt="setting"
            width={80}
            height={80}
          />
          <LoginLogoutBtn text="Logout" clickFunction={logoutHandler}/>
        </div>
      }
    </>
  );
}