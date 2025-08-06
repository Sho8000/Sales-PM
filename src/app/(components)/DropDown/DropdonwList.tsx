/* import { Prospects } from "@/lib/dbInterface";

interface DropdownProps{
  filter?:boolean;
  prospectsInfo:Prospects;
}

export default function DropDown({filter=true,prospectsInfo}:DropdownProps) {
  

  return (
    <div className="w-fit m-auto mb-[1rem] px-[1rem] py-[0.3rem] border-1 border-black rounded-md">
      <select name="filter" id="filter" value={selectedInfo} onChange={handleInfoChange}>
        <option value="0">{filter?("All"):("Name")}</option>
        {categories.map((item,index)=>
          <option key={index} value={`${item}`}>{item}</option>
        )}
      </select>
    </div>
  );
}
 */