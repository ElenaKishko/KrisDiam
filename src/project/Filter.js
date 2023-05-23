import {useState} from 'react'
import { useSelector } from "react-redux"
import { FilterStore } from './FilterStore'
import DropdownComp from './Dropdown'
function FilterComp(props) {
    const storeData = useSelector(state => state)
    const {filterAndSort,category} = props
    const[open, setOpen] = useState(false)
    const[selected, setSelected] = useState("Sort")
    //save all existing categories and gemstones in variables
    let categories = [...new Set(storeData.wholeCollection.map((product) => product.type))]
    let gemstones = [...new Set(storeData.wholeCollection.map((product) => product.gemstone))]
    const handleFilterAndSort = (value) =>
    {
        //set category/gemstone/sort variables
        console.log(value);
        if(categories.find((item) => item === value ) || value == "category"){
        FilterStore.updateCategory(value)
        }else if(gemstones.find((item) => item === value) || value == "gemstone"){
        FilterStore.updateGemstone(value)
        }else{
        FilterStore.updateSort(value)
        }
        filterAndSort()
    }
    //dynamic categories dropdown loading
    let categoriesList = categories.length > 0 
    && categories.map((item, i) => {
        return(
            <option value={item}>{item}</option>
        )
    })
    //dynamic gemstones dropdown loading
    let gemstonesList = gemstones.length > 0 
    && gemstones.map((item, i) => {
        return(
            <option value={item}>{item}</option>
        )
    })
    return (
      <div className="App">
        {/* Header for ProductsByCategoryComp */}
        {
            category != undefined && <h1 className="filter_and_sort_header">{category}</h1>
        }
        <div className="filter_and_sort">
            <div className="filter">
                {/* filter by category */}
                {
                    category == undefined &&
                    <div className="filter_by_type">
                        <h5>Category:</h5>
                        <div className="filter_and_sort_select">
                            <select onChange={e => handleFilterAndSort(e.target.value)}>
                                <option value="category">All</option>
                                {categoriesList}
                            </select>
                        </div>
                    </div>
                }
                
                {/* filter by gemstone */}
                
                <div className="filter_by_gemstone">
                    <h5>Gemstone:</h5>
                    <div className="filter_and_sort_select">
                        <select onChange={e => handleFilterAndSort(e.target.value)}>
                            <option value="gemstone" >All</option>
                            {gemstonesList}
                        </select>
                    </div>
                </div>
                
            </div>
            {/* sort by price */}
            <div className="sort">
                <div className="sort_select filter_and_sort_select">
                    <select onChange={ e => handleFilterAndSort(e.target.value)}>
                        <option value="sort" selected disabled>Sort</option>
                        <option value="lowest">Price, low to high</option>
                        <option value="highest">Price, high to low</option>
                    </select>
                </div>
            </div>
            {/* <div className="sort">
                <div className="sort-trigger" onClick={() => setOpen(!open)}>
                    <h2>Sort</h2>
                </div>
                <div className="sort-dropdown sort_select filter_and_sort_select">
                    {open && <ul>
                        <li id="lowest" onClick={ e => handleFilterAndSort(e.target.id)}>Price, low to high</li>
                        <li id="highest" onClick={ e => handleFilterAndSort(e.target.id)}>Price, high to low</li>
                    </ul>}
                    
                </div>
            </div> */}

            <DropdownComp selected={selected} setSelected={setSelected} handleFilterAndSort={handleFilterAndSort}/>
        </div>
      </div>
    );
}


export default FilterComp;
