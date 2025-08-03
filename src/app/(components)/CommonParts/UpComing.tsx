import Styles from "./CommonParts.module.css"

interface TitleProps {
  text:"Upcoming"|"Appointment";
  clickFunction: ()=>void;
}

export default function UpComing({text,clickFunction}:TitleProps) {

  return (
    <div className={`w-full font-bold mb-[1rem] ${Styles.textFont}`}>
      <h2 className={`w-full text-center ${Styles.forPC}`}>
        {text} : <span className="text-red-500 underline" onClick={clickFunction}>20th Jul 2025, Change to Database</span>
      </h2>
      <div className={`${Styles.forPhone}`}>
        <h2 className={`w-full text-center`}>
          {text}
        </h2>
        <h2 className="text-red-500 underline text-center" onClick={clickFunction}>20th Jul 2025, Change to Database</h2>
      </div>
    </div>
  );
}
