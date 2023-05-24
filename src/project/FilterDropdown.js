import { useState } from "react"

function FilterDropdownComp({filterType, arr, selected, setSelected, handleFilterAndSort}){
    const[isActive, setIsActive] = useState(false)
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
        <div className="dropdown">
            {/* <div className="dropdown_btn" onClick={() => setIsActive(!isActive)}> */}
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
