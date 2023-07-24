import { useRef, useEffect, useState } from "react";
import { FilterStore } from "./stores";
import * as Icons from "react-icons/vsc";
import {
  SortDropdown,
  FilterDropdown,
  SortDropdownMobile,
  FilterMenuSidebar,
} from "./components";

function Filter(props) {
  const {
    filterAndSort,
    category,
    setOverlay,
    categories,
    gemstones,
    filterSelected,
    sort,
  } = props;
  const [selectedSort, setSelectedSort] = useState("Sort");
  const [filteringMenuIsActive, setFilteringMenuIsActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGemstone, setSelectedGemstone] = useState("All");
  let filterMenuRef = useRef();

  //fuction to close the filtering sidebar when clicking outside of it
  useEffect(() => {
    let handler = (e) => {
      if (!filterMenuRef.current.contains(e.target)) {
        setFilteringMenuIsActive(false);
        setOverlay(false);
        // Unsets background scrolling to use when side menu is closed
        document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("mousedown", handler);
  });

  const handleFilterAndSort = (value) => {
    //set category/gemstone/sort variables
    if (categories.find((item) => item === value) || value == "category") {
      FilterStore.updateCategory(value);
    } else if (
      gemstones.find((item) => item === value) ||
      value == "gemstone"
    ) {
      FilterStore.updateGemstone(value);
    } else {
      FilterStore.updateSort(value);
    }
    filterAndSort();
  };
  const openFilteringMenu = () => {
    setFilteringMenuIsActive(true);
    setOverlay(true);
    // Disables background scrolling when side menu is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  const closeFilteringMenu = () => {
    setFilteringMenuIsActive(false);
    setOverlay(false);
    // Unsets background scrolling to use when side menu is closed
    document.body.style.overflow = "unset";
  };
  return (
    <>
      {/* Header for ProductsByCategory */}
      {category != undefined ? (
        <h1 className="filter_and_sort_header">{category}</h1>
      ) : (
        <h1 className="filter_and_sort_header">Entire Collection</h1>
      )}
      <div className="filter_and_sort">
        <div className="filter">
          {category == undefined && (
            <div className="filter_by_type">
              <h5>Category:</h5>
              <FilterDropdown
                filterType={"category"}
                arr={categories}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                handleFilterAndSort={handleFilterAndSort}
              />
            </div>
          )}

          <div className="filter_by_gemstone">
            <h5>Gemstone:</h5>
            <FilterDropdown
              filterType={"gemstone"}
              arr={gemstones}
              selected={selectedGemstone}
              setSelected={setSelectedGemstone}
              handleFilterAndSort={handleFilterAndSort}
            />
          </div>
        </div>

        <SortDropdown
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          handleFilterAndSort={handleFilterAndSort}
        />
      </div>
      <div className="filter_and_sort_mobile">
        <SortDropdownMobile
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          sort={sort}
        />
        <div>|</div>
        <div
          className="filter_and_sort_mobile_filter"
          onClick={() => openFilteringMenu()}
        >
          <div>Filter</div>
          <div>
            <Icons.VscFilter />
          </div>
        </div>

        {filteringMenuIsActive && (
          <div className="filteringMenu" ref={filterMenuRef}>
            <FilterMenuSidebar
              closeFilteringMenu={closeFilteringMenu}
              category={category}
              filterSelected={filterSelected}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Filter;
