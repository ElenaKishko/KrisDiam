// import { a } from '@react-spring/web'
import React, { useState, useEffect, useRef } from 'react'
import * as VSCodeIcons from "react-icons/vsc"
import { CSSTransition } from 'react-transition-group'
import { useSelector } from "react-redux"

const FilterMenuSidebar = () => {
  const storeData = useSelector(state => state)
  const [activeMenu, setActiveMenu] = useState('main')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedGemstones, setSelectedGemstones] = useState([])
  const [checked, setChecked] = useState(false)

  //save all existing categories and gemstones in variables
  let categories = [...new Set(storeData.wholeCollection.map((product) => product.type))]
  let gemstones = [...new Set(storeData.wholeCollection.map((product) => product.gemstone))]

  function DropdownItem(props) {
    return (
      <a href="#" className={props.className} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        {props.children}
      </a>
    );
  }

  //dynamic menu sub lists loading
  function DropdownSubItem ({arr, selected, setSelected}) {
    let arrList = arr.length > 0 && arr.map((item, index) => {
      if(item != undefined){
        return(
          <div key={index} className={checked ? "menu_item menu_subitem menu_subitem_checked" : "menu_item menu_subitem"} onClick={() => handleSelected(item, selected, setSelected)}>{item}</div>
       )
      }
    })
    return <>{arrList}</>
  }

  //handle selected/unselected sublist item
  const handleSelected = (item, selected, setSelected) => {
    console.log(selected);
    let index = selected.findIndex(x => x == item)
    if(index < 0){
      setSelected(x => [...x, item])
      setChecked(true)
    }
    else{
      let arr = selected.filter(x => x != item)
      setSelected(arr)
      setChecked(false)
    }
    
  }
  return (
    <div className="filteringMenu_sidebar" >
      
    <CSSTransition
      in={activeMenu === 'main'}
      timeout={500}
      classNames="menu-primary"
      unmountOnExit>
      <div className="menu">
        <DropdownItem className="menu_item filteringMenu_header">Filter</DropdownItem>
        <DropdownItem
          goToMenu="categories"
          className="menu_item menu_subitem">
          Categories
        </DropdownItem>
        <DropdownItem
          goToMenu="gemstones"
          className="menu_item menu_subitem">
          Gemstones
        </DropdownItem>
        <div className="filteringMenu_button_wrapper">
          <div className="filteringMenu_button">View items</div>
        </div>
      </div>
    </CSSTransition>

    <CSSTransition
      in={activeMenu === 'categories'}
      timeout={500}
      classNames="menu-secondary"
      unmountOnExit>
      <div className="menu">
        <DropdownItem className="menu_item filteringMenu_header" goToMenu="main">
            <VSCodeIcons.VscArrowLeft/>
            <div>Categories</div>
        </DropdownItem>
        {<DropdownSubItem arr={categories} selected={selectedCategories} setSelected={setSelectedCategories}/>}
        <div className="filteringMenu_button_wrapper">
          <div className="filteringMenu_button">View items</div>
        </div>
      </div>
    </CSSTransition>

    <CSSTransition
      in={activeMenu === 'gemstones'}
      timeout={500}
      classNames="menu-secondary"
      unmountOnExit>
      <div className="menu">
        <DropdownItem className="menu_item filteringMenu_header" goToMenu="main">
            <VSCodeIcons.VscArrowLeft/>
            <div>Gemstones</div>
        </DropdownItem>
        {<DropdownSubItem arr={gemstones} selected={selectedGemstones} setSelected={setSelectedGemstones}/>}
        <div className="filteringMenu_button_wrapper">
          <div className="filteringMenu_button">View items</div>
        </div>
      </div>
    </CSSTransition>
  </div>
  )
}

export default FilterMenuSidebar