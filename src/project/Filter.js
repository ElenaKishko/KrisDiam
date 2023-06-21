import {useRef, useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { FilterStore } from './FilterStore'
import SortDropdownComp from './SortDropdown'
import FilterDropdownComp from './FilterDropdown'
import SortDropdownComp2 from './SortDropdown2'
import * as VSCodeIcons from "react-icons/vsc"
import FilterMenuSidebar from './FilterMenuSidebar'

function FilterComp(props) {
    const storeData = useSelector(state => state)
    const {filterAndSort,category, setOverlay} = props
    const[selectedSort, setSelectedSort] = useState("Sort")
    const[filteringMenuIsActive, setFilteringMenuIsActive] = useState(false)
    const[selectedCategory, setSelectedCategory] = useState("All")
    const[selectedGemstone, setSelectedGemstone] = useState("All")
    let filterMenuRef = useRef()

    //fuction to close the filtering sidebar when clicking outside of it
    useEffect(() => {
        let handler = (e) => {
            if(!filterMenuRef.current.contains(e.target)){
                setFilteringMenuIsActive(false)
                setOverlay(false)
            }
        }
        document.addEventListener("mousedown", handler)
    })

    //save all existing categories and gemstones in variables
    let categories = [...new Set(storeData.wholeCollection.map((product) => product.type))]
    let gemstones = [...new Set(storeData.wholeCollection.map((product) => product.gemstone))]
    const handleFilterAndSort = (value) => {
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
      <>
        {/* Header for ProductsByCategoryComp */}
        {
            category != undefined ? <h1 className="filter_and_sort_header">{category}</h1> :
            <h1 className="filter_and_sort_header">Everything</h1>
        }
        <div className="filter_and_sort">
            <div className="filter">
               
                {
                    category == undefined &&
                    <div className="filter_by_type">
                        <h5>Category:</h5>
                        <FilterDropdownComp filterType={"category"} arr={categories} selected={selectedCategory} setSelected={setSelectedCategory} handleFilterAndSort={handleFilterAndSort}/>
                    </div>
                }
                
             
                <div className="filter_by_gemstone">
                    <h5>Gemstone:</h5>
                    <FilterDropdownComp filterType={"gemstone"} arr={gemstones} selected={selectedGemstone} setSelected={setSelectedGemstone} handleFilterAndSort={handleFilterAndSort}/>
                </div>
                
            </div>
          
            <SortDropdownComp selectedSort={selectedSort} setSelectedSort={setSelectedSort} handleFilterAndSort={handleFilterAndSort}/>
        </div>
        <div className='filter_and_sort_mobile'>
            
            <SortDropdownComp2 selectedSort={selectedSort} setSelectedSort={setSelectedSort} handleFilterAndSort={handleFilterAndSort}/>
            <div>|</div>
            <div className='filter_and_sort_mobile_filter' onClick={() => {setFilteringMenuIsActive(true)
                setOverlay(true)}}>
                <div>Filter</div>
                <div><VSCodeIcons.VscFilter/></div>
            </div>
    
            {filteringMenuIsActive && (
                <div className='filteringMenu' ref={filterMenuRef}>
                    <FilterMenuSidebar/>
                </div>
            )}
        </div>
      </>
    );
}


export default FilterComp;
