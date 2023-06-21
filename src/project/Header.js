import { useEffect, useRef, useState } from "react"
import {Link} from 'react-router-dom'
import { observer } from "mobx-react"
import { CartStore } from './CartStore'
import logo from '../img/icons/logo.svg'
import arrow from '../img/icons/arrow-down.svg'
import search from '../img/icons/search.svg'
import profile from '../img/icons/profile.svg'
import basket from '../img/icons/basket.svg'
import { useSelector } from "react-redux"
import * as FeatherIcons from "react-icons/fi"
import 'bootstrap/dist/css/bootstrap-grid.css'
import Container from 'react-bootstrap/Container'

const HeaderComp = observer( () =>{
  const storeData = useSelector(state => state)
  let categories = [...new Set(storeData.wholeCollection.map((product) => product.type))]
  const[isActive, setIsActive] = useState(false)
  let dropdownClose =  useRef()
  //fuction to close the dropdown when clicking outside of it
  useEffect(() =>{
      let handler = (e) => {
          if(!dropdownClose.current.contains(e.target)){
              setIsActive(false)
          }
      }
      document.addEventListener("mousedown", handler)
      return() => {
          document.removeEventListener("mousedown", handler)
      }
  })
  //dynamic dropdown loading
  let shopList = categories.length > 0 
  && categories.map((item, i) => {
      return(
        <div className="header_dropdown_item" onClick={() => setIsActive(false)}><Link to={"/products/" + item} >{item}</Link></div>
      )
  })

  return (
      <header className='header'>
        <Container  className='container-xxl container-xl container-lg container-md container-sm'>
          <div className="wrapper">
            <div>
              <div className="header_logo">
                <Link to="/"><img src={logo} alt="logo"/></Link>
              </div>
            </div>
            <div>
              <nav>
                  <ul className="header_menu">
                    <li className="header_menu_item"><Link className="header_menu_link" to='/'>Home</Link></li>
                    <li className="header_menu_item">
                      <div  className="header_dropdown"  onClick={() => setIsActive(!isActive)}>
                        <span>Shop</span>
                        <div className="header_dropdown_btn">
                          <FeatherIcons.FiChevronDown/>
                        </div>
                        {isActive && (
                            <div className="header_dropdown_content"  ref={dropdownClose}>
                                <div className="header_dropdown_item" onClick={() => setIsActive(false)}><Link to="/products">Everything</Link></div>
                                {shopList}
                            </div>
                        )}
                      </div>
                    </li>
                    <li className="header_menu_item"><Link className="header_menu_link" to='/about'>About</Link></li>
                  </ul>
              </nav>
            </div>
            <div>
              <div className="header_icons">
                {/* <a href="#"><img src={search} alt="search"/></a> */}
                {/* <a href="#"><img src={profile} alt="profile"/></a> */}
                <Link to="/basket" className="header_icons_basket"><img src={basket} alt="basket"/><span>{CartStore.cartCounter}</span></Link>
              </div>
            </div>
          </div>
        </Container>
      </header>
  );
  
}
)
export default HeaderComp;