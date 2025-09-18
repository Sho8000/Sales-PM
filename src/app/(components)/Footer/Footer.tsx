import Image from "next/image";
import Styles from "./Footer.module.css"
import salesPM_Logo from "@/../public/Footer/SalesPM_Logo_200_200_whiteBorder.png"

export default function Footer() {

  return (
    <>
      <div className={`bg-black text-white text-center`}>
        <div className={`w-[90%] flex justify-center items-center m-auto ${Styles.footerContainer}`}>
          <Image
            className={`${Styles.logoSize}`}
            src={salesPM_Logo}
            alt="Sales_PM"
            width={200}
            height={200}
          />
          <div className={`grow ${Styles.sentenceLayout}`}>
            <p className={`mb-3 ${Styles.footerFont}`}>If you are interested in Sales-PM, feel free to contact me!</p>
            <div className={`flex flex-col gap-3 text-sky-400 ${Styles.linkFont}`}>
              <p>
                <a href="mailto:sho.website.appbuilder@gmail.com">Email</a>
              </p>
              <p>
                <a href="https://sho-website-app-builder-portfolio.vercel.app/">Website</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
