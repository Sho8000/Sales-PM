"use client"

import { usePathname, useRouter } from "next/navigation";
import Styles from "./Nav.module.css"
import HbgBtn from "../Btn/HbgBtn";
import LoginLogoutBtn from "../Btn/LoginLogoutBtn";
import { useState } from "react";
import Image from "next/image";

import settingIcon from "@/../public/Nav/settings.svg"
import homeIcon from "@/../public/Nav/homeIcon_80_80.png"
import { signOut, useSession } from "next-auth/react";
import { useSettingPageContext } from "@/app/(context)/SettingOpenContext";
import SettingTemplate from "../Setting/SettingTemplate";

export default function Navbar() {
  const router = useRouter(); 
  const { data: session } = useSession()
  const pathName = usePathname();
  const [isHbgBtnClicked, setIsHbgBtnClicked] = useState(false);
  const {changeSettingPageStatus} = useSettingPageContext();

  const loginHandler = () => {
    router.push("/auth");
  }

  const logoutHandler = () => {
    signOut();
  }

  const homeIconHandler = () => {
    if(pathName==="/auth"){
      router.push("/");
    } else{
      router.push("/prospectslist")
    }
  }

  const SettingIconHandler = () => {
    changeSettingPageStatus(true)
  }

  const hbgBtnHandler = () => {
    setIsHbgBtnClicked(!isHbgBtnClicked)
  }

  return (
    <>
      <nav className={`flex justify-between items-center w-full bg-black text-white ${Styles.navArea} ${Styles.navTitleFont}`}>
        {/* Nav Left */}
        <div>
          {(pathName==="/" || pathName==="/auth")?
            <h1 className="font-bold">Sales-PM</h1>
            :<h1>Hi, <span className="font-bold">{session?.user?.username}</span></h1>
          }
        </div>
        {/* Nav Right */}
        {pathName!=="/auth" ?
          <>
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
          </>
          :<Image
            className={`${Styles.NavIconSize}`}
            onClick={homeIconHandler}
            src={homeIcon}
            alt="home"
            width={80}
            height={80}
          />

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
      <SettingTemplate title={"Setting"}/>
    </>
  );
}