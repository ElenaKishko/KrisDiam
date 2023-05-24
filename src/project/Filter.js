import {useState} from 'react'
import { useSelector } from "react-redux"
import { FilterStore } from './FilterStore'
import SortDropdownComp from './SortDropdown'
import FilterDropdownComp from './FilterDropdown'

function FilterComp(props) {
    const storeData = useSelector(state => state)
    const {filterAndSort,category} = props
    const[selectedSort, setSelectedSort] = useState("Sort")
    const[selectedCategory, setSelectedCategory] = useState("All")
    const[selectedGemstone, setSelectedGemstone] = useState("All")

    //save all existing categories and gemstones in variables
    let categories = [...new Set(storeData.wholeCollection.map((product) => product.type))]
    let gemstones = [...new Set(storeData.wholeCollection.map((product) => product.gemstone))]
    const handleFilterAndSort = (value) =>
    {
        //set category/gemstone/sort variables
        if(categories.find((item) => item === value ) || value == "category"){
        FilterStore.updateCategory(value)
        }else if(gemstones.find((item) => item === value) || value == "gemstone"){
        FilterStore.updateGemstone(value)
        }else{
        FilterStore.updateSort(value)
        }
        filterAndSort()
    }
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
                        <FilterDropdownComp filterType={"category"} arr={categories} selected={selectedCategory} setSelected={setSelectedCategory} handleFilterAndSort={handleFilterAndSort}/>
                    </div>
                }
                
                {/* filter by gemstone */}
                <div className="filter_by_gemstone">
                    <h5>Gemstone:</h5>
                    <FilterDropdownComp filterType={"gemstone"} arr={gemstones} selected={selectedGemstone} setSelected={setSelectedGemstone} handleFilterAndSort={handleFilterAndSort}/>
                </div>
                
            </div>
            {/* sort by price */}
            <SortDropdownComp selectedSort={selectedSort} setSelectedSort={setSelectedSort} handleFilterAndSort={handleFilterAndSort}/>
        </div>
      </div>
    );
}


export default FilterComp;
