"use client"

import NormalBtn from "./(components)/Btn/NormalBtn";

export default function Home() {

  const normalBtntest = () => {
    console.log("noramlTest")
  }

  return (
    <>
      <section className="bg-pink-400">
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
      </section>
    </>
  );
}
