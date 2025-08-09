import Styles from "../prospectsList.module.css"

interface ProspectTitleProps {
  button:React.ReactNode;
}

export default function ProspectTitle({button}:ProspectTitleProps) {

  return (
    <>
      <div className={`relative w-full font-bold`}>
        <h1 className={`ml-[1rem] ${Styles.noteTitleFont}`}>Notes</h1>
        <div className="absolute flex items-center top-[50%] right-[1rem] translate-y-[-50%]">{button}</div>
      </div>
    </>
  );
}
