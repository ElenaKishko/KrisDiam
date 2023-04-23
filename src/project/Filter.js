import DropdownExampleSimple from "./tests/example"

function FilterComp(props) {
    return (
      <div className="App">
        <div className="filter_and_sort">
            <div className="filter">
                Filter by
                <div className="filter_by_type">Type:
                    <select value={props.type} onChange={props.filterByType}>
                        <option value="">All</option>
                        <option value="earrings">Earrings</option>
                        <option value="ring">Rings</option>
                        <option value="set">Sets</option>
                        <option value="pendant">Pendants</option>
                    </select>
                </div>
                <div className="filter_by_gemstone">Gemstone:
                    <select value={props.gemstone} onChange={props.filterByGemstone}>
                        <option value="">All</option>
                        <option value="agate">Agate</option>
                        <option value="amethyst">Amethyst</option>
                        <option value="aquamarine">Aquamarine</option>
                        <option value="cubic zirconia">Cubic zirconia</option>
                        <option value="moonstone">Moonstone</option>
                    </select>
                </div>
            </div>
            <div className="sort">
            Sort by
                <select value={props.sort} onChange={props.sortProducts}>
                    <option value=""></option>
                    <option value="lowest">Price, low to high</option>
                    <option value="highest">Price, high to low</option>
                    <option value="newest">Date, new to old</option>
                    <option value="oldest">Date, old to new</option>
                </select>
            </div>
        </div>
        
        {/* <select value={props.type} onChange={props.filterByType} className="custom-select container m-4" >
            <option value="">All</option>
            <option value="earrings">Earrings</option>
            <option value="ring">Rings</option>
            <option value="set">Sets</option>
            <option value="pendant">Pendants</option>
        </select> */}
      </div>
    );
}
export default FilterComp;
