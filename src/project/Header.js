import {Link} from 'react-router-dom'
import { observer } from "mobx-react"
import { CartStore } from './CartStore'
import logo from '../img/icons/logo.svg'
import arrow from '../img/icons/arrow-down.svg'
import search from '../img/icons/search.svg'
import profile from '../img/icons/profile.svg'
import basket from '../img/icons/basket.svg'
import { useSelector } from "react-redux"
import { useState } from 'react'


import 'bootstrap/dist/css/bootstrap-grid.css'
import Container from 'react-bootstrap/Container'

const HeaderComp = observer( () =>{
  const storeData = useSelector(state => state)
  let categories = [...new Set(storeData.wholeCollection.map((product) => product.type))]
  const[isActive, setIsActive] = useState(false)
  let shopList = categories.length > 0 
  && categories.map((item, i) => {
      return(
        <div className="header_dropdown_item" onClick={() => setIsActive(false)}><Link to={"/products/" + item} >{item}</Link></div>
      )
  })

  return (
    <div className="App">
      <header className='header'>
        <Container>
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
                      <div className="header_dropdown" onClick={() => setIsActive(!isActive)}>
                        <span>Shop</span>
                        <div className="header_dropdown_btn">
                          <span className="fas fa-caret-down"></span>
                        </div>
                        {isActive && (
                            <div className="header_dropdown_content">
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
    </div>
  );
  
}
)
export default HeaderComp;




// .dropdown
//     width: 200px
//     user-select: none
//     position: relative
//     &_btn
//         padding: 15px 20px  
//         background: #fff
//         box-shadow: 3px 3px 5px 3px rgba(0,0,0,0.03)
//         font-weight: bold
//         color: $text_color
//         display: flex
//         align-items: center
//         justify-content: space-between
//         border-radius: 4px
//         text-transform: capitalize
//         letter-spacing: 0.02em
//     &_content
//         position: absolute
//         top: 110%
//         left: 0
//         width: 100%
//         padding: 10px
//         background: rgba(171,14,102, 0.7)
//         box-shadow: 3px 3px 10px 6px rgba(0,0,0,0.06)
//         font-weight: 500
//         color: $white_color
//         z-index: 1
//         border-radius: 4px
//     &_item
//         padding: 10px
//         transition: all 0.2s
//         text-transform: capitalize
//         letter-spacing: 0.08em
//         &:hover
//             background: rgba(171,14,102, 0.9)
//             border-radius: 4px
    