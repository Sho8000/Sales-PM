import Styles from "./Dropdown.module.css"

interface DropdownProps{
  filter:"Filter"|"Sort";
  value:string
  onChange: (selectedValue: string) => void;
}

export default function DropDown({filter,value,onChange}:DropdownProps) {

  const handleInfoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`flex justify-center items-center gap-[1rem] ${Styles.filterContainer}`}>
      <p className={`w-fit text-center ${Styles.filterTitleFont}`}>{filter} :</p>
      <div className="m-auto grow px-[1rem] py-[0.3rem] border-1 border-black rounded-md ">
        <select
          className={`w-full ${Styles.filterPlaceFont}`}
          name="filter"
          id="filter"
          value={value}
          onChange={handleInfoChange}
        >
          <option
            className={`text-sm`}
            value={filter==="Filter"?("All"):("Name")}>
              {filter==="Filter"?("All"):("Name")}
            </option>
          <option className={`text-sm`} value="Value111">Value1</option>
        </select>
      </div>
    </div>
  );
}
