import { useEffect, useRef, useState } from "react"

function FilterDropdownComp({filterType, arr, selected, setSelected, handleFilterAndSort}){
    const[isActive, setIsActive] = useState(false)
    let dropdownRef =  useRef()
    //fuction to close the dropdown when clicking outside of it
    useEffect(() =>{
        let handler = (e) => {
            if(!dropdownRef.current.contains(e.target)){
                setIsActive(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return() => {
            document.removeEventListener("mousedown", handler)
        }
    })
     //dynamic dropdown loading
     let filterList = arr.length > 0 
     && arr.map((item, index) => {
         return(
            <div key={index} className="dropdown_item" onClick={(e) => {
                setSelected(item)
                setIsActive(false)
                handleFilterAndSort(item)
            }}>{item}</div>
         )
     })
    
    return(
        <div className="dropdown"  ref={dropdownRef}>
            <div className="dropdown_btn" onClick={() => setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown_content">
                    <div className="dropdown_item" onClick={() => {
                        setSelected("All")
                        setIsActive(false)
                        handleFilterAndSort(filterType)
                        }}>All</div>
                    {filterList}
                </div>
            )}
        </div>
    )
}

export default FilterDropdownComp;
