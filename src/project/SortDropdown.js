import { useEffect, useRef, useState } from "react";

function SortDropdown({ selectedSort, setSelectedSort, handleFilterAndSort }) {
  const [isActive, setIsActive] = useState(false);
  let dropdownRef = useRef();
  //fuction to close the dropdown when clicking outside of it
  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const options = [
    { value: "lowest", text: "Price, low to high" },
    { value: "highest", text: "Price, high to low" },
  ];
  return (
    <div className="dropdown dropdown_sort" ref={dropdownRef}>
      <div
        className="dropdown_btn dropdown_btn_sort"
        onClick={() => setIsActive(!isActive)}
      >
        {selectedSort}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown_content">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown_item"
              onClick={(e) => {
                setSelectedSort(option.text);
                setIsActive(false);
                handleFilterAndSort(option.value);
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

export default SortDropdown;
