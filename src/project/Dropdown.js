import { useState } from "react"

function DropdownComp({selected, setSelected,handleFilterAndSort}){
    const[isActive, setIsActive] = useState(false)
    const options = [{value:"lowest", text: "Price, low to high"}, 
                     {value:"highest", text:"Price, high to low"} ]
    return(
        <div className="sort_dropdown">
            <div className="sort_dropdown_btn" onClick={() => setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="sort_dropdown_content">
                    {
                        options.map((option,index )=> (
                            <div key={index} className="sort_dropdown_item" onClick={(e) => {
                                setSelected(option)
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

export default DropdownComp;