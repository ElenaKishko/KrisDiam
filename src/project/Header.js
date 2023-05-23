import {Link} from 'react-router-dom'
import { observer } from "mobx-react"
import { CartStore } from './CartStore'
import logo from '../img/icons/logo.svg'
import arrow from '../img/icons/arrow-down.svg'
import search from '../img/icons/search.svg'
import profile from '../img/icons/profile.svg'
import basket from '../img/icons/basket.svg'
import { useSelector } from "react-redux"


import 'bootstrap/dist/css/bootstrap-grid.css'
import Container from 'react-bootstrap/Container'

const HeaderComp = observer( () =>{
  const storeData = useSelector(state => state)
  let categories = [...new Set(storeData.wholeCollection.map((product) => product.type))]

  let categoriesList = categories.length > 0 
  && categories.map((item, i) => {
      return(
        <li className="header_menu_shop_dropdown_item"><Link to={"/products/" + item} >{item}</Link></li>
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
                      <div className="header_menu_link header_menu_shop_trigger" to='/products'>
                        Shop
                        <img src={arrow} alt='arrow'/>
                      </div>
                      {/* <div className="header_menu_shop_dropdown">
                        <nav>
                        <ul>
                          <li className="header_menu_shop_dropdown_item"><Link to="/products">Everything</Link></li>
                          {categoriesList}
                        </ul>
                        </nav>
                       
                      </div> */}
                    </li>
                    <li className="header_menu_item"><Link className="header_menu_link" to='/about'>About</Link></li>
                  </ul>
              </nav>
            </div>
            <div>
              <div className="header_icons">
                <a href="#"><img src={search} alt="search"/></a>
                <a href="#"><img src={profile} alt="profile"/></a>
                <Link to="/basket"><img src={basket} alt="basket"/><span>{CartStore.cartCounter}</span></Link>
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
