import Styles from "./Home.module.css"

export default function SubTitle() {

  return (
    <>
      <div className={`font-bold m-auto ${Styles.subComponent} ${Styles.subTitleFont}`}>
        <h1 className={`w-full text-center text-[#808080]`}>Sales-PM (Prospect Management) is a smart tool that helps you manage prospects and handle client deals more efficiently. Limited user can use this app.</h1>
      </div>
    </>
  );
}
