import Styles from "./CommonParts.module.css"

interface TitleProps {
  text:string;
  button?:React.ReactNode;
}

export default function SectionTitle({text,button}:TitleProps) {

  return (
    <>
      {/* Only for bigger screen */}
      <div className={`relative w-full font-bold ${Styles.titleFont} ${Styles.btnLayoutForBig}`}>
        <h1 className="w-full text-center">{text}</h1>
        <div className="absolute flex items-center top-[50%] right-[1rem] translate-y-[-50%]">{button}</div>
      </div>

      {/* Only for smaller screen */}
      <div className={`flex w-full font-bold ${Styles.titleFont} ${Styles.btnLayoutForSmall}`}>
        <h1 className="w-full text-center">{text}</h1>
        <div className="flex items-center">{button}</div>
      </div>
    </>
  );
}
