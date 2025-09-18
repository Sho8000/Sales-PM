import Styles from "./Home.module.css"

interface HomeTitleProps {
  text:string;
}

export default function HomeTitle({text}:HomeTitleProps) {

  return (
    <>
      <div className={`w-full font-bold ${Styles.homeTitleFont}`}>
        <h1 className="w-full text-center">{text}</h1>
      </div>
    </>
  );
}
