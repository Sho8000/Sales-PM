import Styles from "./Dropdown.module.css"
import { useUserInfoStore } from "@/store/userInfoStore";

interface DropdownProps{
  filter:"Filter"|"Sort";
  value:string
  onChange: (selectedValue: string) => void;
}

export default function DropDown({filter,value,onChange}:DropdownProps) {
  const userData = useUserInfoStore((state) => state.user); //use user's all Information

  const handleInfoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`flex justify-center items-center gap-[1rem] ${Styles.filterContainer}`}>
      <p className={`w-fit text-center ${Styles.filterTitleFont}`}>{filter} :</p>
      <div className="m-auto grow px-[1rem] py-[0.3rem] border-1 border-black rounded-md bg-white">
        <select
          className={`w-full ${Styles.filterPlaceFont}`}
          name="filter"
          id="filter"
          value={value}
          onChange={handleInfoChange}
        >
          {filter === "Filter" &&
            <>
              <option
                className={`text-sm`}
                value={"All"}
              >
                All
              </option>

              {userData?.contentsSetting &&
                userData.contentsSetting.map((content,index)=>{
                  return <option key={index} className={`text-sm`} value={content.contentName}>{content.contentName}</option>
                })
              }

              <option
                className={`text-sm`}
                value={"Others"}
              >
                Others
              </option>

            </>
          }

          {filter === "Sort" &&
            <>
              {userData?.prospectList?.prospects &&
                <>
                  <option
                    className={`text-sm`}
                    value={"createdAt"}
                  >
                    Latest
                  </option>
                  <option
                    className={`text-sm`}
                    value={"prospectName"}
                  >
                    Prospect Name
                  </option>
                  <option
                    className={`text-sm`}
                    value={"prospectBusiness"}
                  >
                    Business Name
                  </option>
                  {userData.statusSetting.length>1 &&
                    <option
                      className={`text-sm`}
                      value={"statusName"}
                    >
                      Status
                    </option>
                  }
                  <option
                    className={`text-sm`}
                    value={"oldest"}
                  >
                    Oldest
                  </option>

                </>
              }
            </>
          }
        </select>
      </div>
    </div>
  );
}
