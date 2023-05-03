import { Dropdown, Menu } from 'semantic-ui-react'

function FilterComp(props) {
    return (
      <div className="App">
        <div className="filter_and_sort">
            <div className="filter">
                Filter by
                <div className="filter_by_type">Type:
                    <select onChange={e => props.filterByType(e.target.value)}>
                        <option value="">All</option>
                        <option value="earrings">Earrings</option>
                        <option value="ring">Rings</option>
                        <option value="set">Sets</option>
                        <option value="pendant">Pendants</option>
                    </select>
                </div>
                <div className="filter_by_gemstone">Gemstone:
                    <select onChange={e => props.filterByGemstone(e.target.value)}>
                        <option value="">All</option>
                        <option value="agate">Agate</option>
                        <option value="amethyst">Amethyst</option>
                        <option value="aquamarine">Aquamarine</option>
                        <option value="cubic zirconia">Cubic zirconia</option>
                        <option value="moonstone">Moonstone</option>
                    </select>
                </div>
            </div>
            <div className="sort_by_price">
            Sort by
                <select onChange={ e => props.sortProducts(e.target.value)}>
                    <option value=""></option>
                    <option value="lowest">Price, low to high</option>
                    <option value="highest">Price, high to low</option>
                </select>
            </div>
        </div>

        {/* <select value={props.type} onChange={props.filterByType} className="custom-select container m-2" >
                <option value="">All</option>
                <option value="earrings">Earrings</option>
                <option value="ring">Rings</option>
                <option value="set">Sets</option>
                <option value="pendant">Pendants</option>
            </select> */}
        {/* <Menu compact>
            <Dropdown value={options.value} onChange={(value) => setValue(value)} text='SORT BY' options={options} simple item />

            <Dropdown value={props.sort} onChange={props.sortProducts} text='SORT BY' options={options} simple item />
        </Menu> */}
      </div>
    );
}
export default FilterComp;
