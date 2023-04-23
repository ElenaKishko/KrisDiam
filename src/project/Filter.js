import { Dropdown, Menu } from 'semantic-ui-react'

function FilterComp(props) {
    const options = [
        { key: 1, text: 'Price, low to high', value: "lowest" },
        { key: 2, text: 'Price, high to low', value: "highest" }
      ]
    const setValue = (event) =>
    {   
        console.log(event.target.value);

    }
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

            {/* <select value={props.type} onChange={props.filterByType} className="custom-select container m-2" >
                <option value="">All</option>
                <option value="earrings">Earrings</option>
                <option value="ring">Rings</option>
                <option value="set">Sets</option>
                <option value="pendant">Pendants</option>
            </select> */}

            <div className="sort">
            Sort by
                <select value={props.sort} onChange={props.sortProducts}>
                    <option value=""></option>
                    <option value="lowest">Price, low to high</option>
                    <option value="highest">Price, high to low</option>
                </select>
            </div>
        </div>

        {/* <Menu compact>
            <Dropdown value={options.value} onChange={(value) => setValue(value)} text='SORT BY' options={options} simple item />

            <Dropdown value={props.sort} onChange={props.sortProducts} text='SORT BY' options={options} simple item />
        </Menu> */}
      </div>
    );
}
export default FilterComp;
