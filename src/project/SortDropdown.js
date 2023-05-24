import { useState } from "react"

function SortDropdownComp({selectedSort, setSelectedSort,handleFilterAndSort}){
    const[isActive, setIsActive] = useState(false)
    const options = [{value:"lowest", text: "Price, low to high"}, 
                     {value:"highest", text:"Price, high to low"} ]
    return(
        <div className="dropdown">
            <div className="dropdown_btn" onClick={() => setIsActive(!isActive)}>
                {selectedSort}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown_content">
                    {
                        options.map((option,index )=> (
                            <div key={index} className="dropdown_item" onClick={(e) => {
                                setSelectedSort(option.text)
                                setIsActive(false)
                                handleFilterAndSort(option.value)
                            }}>{option.text}</div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default SortDropdownComp;