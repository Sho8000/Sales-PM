import Image, { StaticImageData } from "next/image";
import Styles from "./Home.module.css"

interface HomeTemplateProps {
  titleText:string;
  message:string;
  imageL?:boolean;
  imagePC:StaticImageData;
  imagePhone:StaticImageData;
}

export default function HomeSectionTemplate({titleText,message,imageL=false,imagePC,imagePhone}:HomeTemplateProps) {

  return (
    <>
      <div className={`flex ${Styles.homeSectionContainer}`}>
        {/* for PC */}
        <div
          className={`
            basis-1/2 text-center
            ${Styles.forPC}
            ${imageL?"order-2":""}
          `}
        >
          <h2 className={`w-full text-center font-bold ${Styles.sectionTitleFont}`}>{titleText}</h2>
          <p className={`w-[90%] mt-[1rem] m-auto ${Styles.sentenceFont}`}>{message}</p>
        </div>
        <div className={`basis-1/2 ${Styles.forPC}`}>
          <Image
            className="border-black border-1 rounded-[10px] opacity-70"
            src={imagePC}
            alt="image for PC"
            priority
          />
        </div>

        {/* for Phone */}
        <h1 className={`w-full text-center font-bold ${Styles.sectionTitleFont} ${Styles.forPhone}`}>{titleText}</h1>
        <Image
          className={`w-[80%] min-w-[300px] max-w-[400px] h-[550px] border-black border-1 object-cover object-top rounded-[5px] opacity-70 ${Styles.forPhone}`}
          src={imagePhone}
          alt="image for Phone"
          priority
        />
        <p className={`w-[90%] m-auto pt-[1rem] ${Styles.sentenceFont} ${Styles.forPhone}`}>{message}</p>
      </div>
    </>
  );
}
