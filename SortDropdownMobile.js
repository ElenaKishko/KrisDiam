import { useEffect, useRef, useState } from "react";
import * as Icons from "react-icons/vsc";
import { FiltersStore } from "./stores";

function SortDropdownMobile({ sort }) {
  const options = [
    { value: "lowest", text: "Price, low to high" },
    { value: "highest", text: "Price, high to low" },
  ];
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const [selected, setSelected] = useState();
  let dropdownClose = useRef();
  //fuction to close the dropdown when clicking outside of it
  useEffect(() => {
    // dropdownClose.current && autoAnimate(dropdownClose.current)
    let handler = (e) => {
      if (!dropdownClose.current.contains(e.target)) {
        setDropdownIsActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const saveSortValueToStore = (value) => {
    FiltersStore.updateSort(value);
    sort();
  };
  return (
    <div className="dropdown_mobile" ref={dropdownClose}>
      <div
        className="dropdown_mobile_sort"
        onClick={() => setDropdownIsActive(!dropdownIsActive)}
      >
        <div>Sort</div>
        <div>
          <Icons.VscListFilter />
        </div>
      </div>

      {dropdownIsActive && (
        <div className="dropdown_content">
          {options.map((option, index) => (
            <div
              className={
                selected == index ? "dropdown_item_selected" : "dropdown_item "
              }
              key={index}
              onClick={(e) => {
                setDropdownIsActive(false);
                saveSortValueToStore(option.value);
                setSelected(index);
              }}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdownMobile;
