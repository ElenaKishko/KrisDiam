import React, { useState, useEffect, useRef } from "react";
import * as Icons from "react-icons/vsc";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { FiltersStore, FilterStore } from "./stores";

const FilterMenuSidebar = ({
  closeFilteringMenu,
  category,
  filterSelected,
}) => {
  const storeData = useSelector((state) => state);
  const [activeMenu, setActiveMenu] = useState("main");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGemstones, setSelectedGemstones] = useState([]);

  //save all existing categories and gemstones in variables
  let categories = [
    ...new Set(storeData.wholeCollection.map((product) => product.type)),
  ];
  let gemstones = [
    ...new Set(storeData.wholeCollection.map((product) => product.gemstone)),
  ];
  //first level menu item
  function DropdownItem(props) {
    return (
      <a
        href="#"
        className={props.className}
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        {props.children}
      </a>
    );
  }

  //second level menu item dynamic loading
  function DropdownSubItem({ arr, selected, setSelected }) {
    let arrList =
      arr.length > 0 &&
      arr.map((item, index) => {
        if (item != undefined) {
          return (
            <div
              key={index}
              className={
                selected.includes(item)
                  ? "menu_item menu_subitem menu_subitem_checked"
                  : "menu_item menu_subitem"
              }
              onClick={() => handleSelected(item, selected, setSelected)}
            >
              {item}
              <span
                style={{ display: selected.includes(item) ? "flex" : "none" }}
              >
                <Icons.VscCheck />
              </span>
            </div>
          );
        }
      });
    return <>{arrList}</>;
  }

  //handle selected/unselected second level menu item
  const handleSelected = (item, selected, setSelected) => {
    let index = selected.findIndex((x) => x == item);
    if (index < 0) {
      setSelected((x) => [...x, item]);
    } else {
      let arr = selected.filter((x) => x != item);
      setSelected(arr);
    }
  };

  //apply filters
  const saveFiltersToStore = () => {
    closeFilteringMenu();
    FiltersStore.updateCategories(selectedCategories);
    FiltersStore.updateGemstones(selectedGemstones);
    filterSelected();
  };

  //reset gemstone selection
  const resetGemstonesSelection = () => {
    closeFilteringMenu();
    FiltersStore.updateCategories([]);
    FiltersStore.updateGemstones([]);
    filterSelected();
  };
  return (
    <div className="filteringMenu_sidebar">
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem className="menu_item filteringMenu_header">
            Filter
            <div
              className="filteringMenu_reset"
              onClick={() => resetGemstonesSelection()}
            >
              clear all
            </div>
          </DropdownItem>

          {/* show option to filter categories only if no category was selected already */}
          {category == undefined && (
            <DropdownItem
              goToMenu="categories"
              className="menu_item menu_subitem"
            >
              Categories
            </DropdownItem>
          )}

          <DropdownItem goToMenu="gemstones" className="menu_item menu_subitem">
            Gemstones
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "categories"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem
            className="menu_item filteringMenu_header"
            goToMenu="main"
          >
            <Icons.VscArrowLeft />
            <div>Categories</div>
          </DropdownItem>
          {
            <DropdownSubItem
              arr={categories}
              selected={selectedCategories}
              setSelected={setSelectedCategories}
            />
          }
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "gemstones"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem
            className="menu_item filteringMenu_header"
            goToMenu="main"
          >
            <Icons.VscArrowLeft />
            <div>Gemstones</div>
          </DropdownItem>
          {
            <DropdownSubItem
              arr={gemstones}
              selected={selectedGemstones}
              setSelected={setSelectedGemstones}
            />
          }
        </div>
      </CSSTransition>
      <div
        className="filteringMenu_button_wrapper"
        onClick={() => saveFiltersToStore()}
      >
        <div className="filteringMenu_button">View items</div>
      </div>
    </div>
  );
};

export default FilterMenuSidebar;
