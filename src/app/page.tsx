"use client"

import AlertBtn from "./(components)/Btn/AlartBtn";
import CloseBtn from "./(components)/Btn/CloseBtn";
import NormalBtn from "./(components)/Btn/NormalBtn";
import SettingBtn from "./(components)/Btn/SettingBtn";

export default function Home() {

  const test = () => {
    console.log("Test")
  }

  const normalBtntest = () => {
    console.log("noramlTest")
  }

  const settingStatusBtnTest = () => {
    console.log("Status & Color")
  }
  const settingContentBtnTest = () => {
    console.log("Content")
  }
  const settingHiddenBtnTest = () => {
    console.log("Hidden")
  }
  const settingPassBtnTest = () => {
    console.log("Pass")
  }
  const alertBtnTest = () => {
    console.log("Alert")
  }

  return (
    <>
      <section className="bg-pink-400">
        <CloseBtn clickFunction={test}/>
        <NormalBtn text="+Add New" clickFunction={normalBtntest}/>
        <NormalBtn text="+Add Note" clickFunction={normalBtntest}/>
        <NormalBtn text="Save" clickFunction={normalBtntest}/>
        <div className="flex">
          <NormalBtn text="+Add New" clickFunction={normalBtntest} changeToPlus={true}/>
          <NormalBtn text="+Add Note" clickFunction={normalBtntest} changeToPlus={true}/>
          <NormalBtn text="Save" clickFunction={normalBtntest} changeToPlus={true}/>
        </div>
      </section>
      <section className="relative bg-yellow-200 flex flex-col gap-[2rem] justify-center items-center">
        <SettingBtn text="Status & Color" clickFunction={settingStatusBtnTest}/>
        <SettingBtn text="Contents" clickFunction={settingContentBtnTest}/>
        <SettingBtn text="Hidden List" clickFunction={settingHiddenBtnTest}/>
        <SettingBtn text="Password" clickFunction={settingPassBtnTest}/>
      </section>
      <section>
        <AlertBtn text="OK" clickFunction={alertBtnTest}/>
        <AlertBtn text="Cancel" clickFunction={alertBtnTest}/>
      </section>
    </>
  );
}
