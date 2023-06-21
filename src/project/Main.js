import { useState } from "react"
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap-grid.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import purpleGrapeSet from '../img/photos/purple grape set.jpeg'
import pinkEarrings from '../img/photos/pink grape earrings.jpeg'
import purpleSet from '../img/photos/purple set.png'
import purpleEarrings from '../img/photos/purple earrings.png'
import ring from '../img/photos/ring.png'
import pinkSet from '../img/photos/pinkset.png'
import { observer } from "mobx-react"
import { action } from "mobx"
import { FilterStore } from './FilterStore'
import { ContactMeComp } from "./ContactMe"


const MainComp = observer(() =>  {
  
  const customSubmit = (e) =>
  {
    e.preventDefault();
  }

  const [userMessage, setUserMessage] = useState({name: '', mobile: '', message: ''})
  const [categories, setCategories] = useState()

  return (
      <div className="main_wrapper">
        <section className="explore">
          <Container>
            <Row>
              <Col>
                <div className="explore_descr">
                  Handcrafted earrings, necklaces and rings from silver and semi precious stones
                </div>
                <Link to="/products">
                  <button className="explore_btn">Explore</button>
                </Link>
              </Col>
              <Col>
                <div className="explore_img">
                  <img className="explore_img_1" src={purpleGrapeSet} alt="purple grape set" />
                  <img className="explore_img_2" src={pinkEarrings} alt="pink grape earrings" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="shop">
          <Container>
            <div className="shop_title">Shop by category</div>
            <div className="shop_categories">
              <div className="shop_categories_item">
                <div className="shop_categories_item_title">Sets</div>
                <Link to="/products/sets" className="shop_categories_item_img"><img src={purpleSet}></img></Link>
              </div>
              <div className="shop_categories_item">
                <div className="shop_categories_item_title">Earrings</div>
                <Link to="/products/earrings" className="shop_categories_item_img"><img src={purpleEarrings}></img></Link>
              </div>
              <div className="shop_categories_item">
                <div className="shop_categories_item_title">Rings</div>
                <Link to="/products/rings" className="shop_categories_item_img"><img src={ring}></img></Link>
              </div>
            </div>
          </Container>
        </section>
        <section>
          <ContactMeComp/>
        </section>
      </div>
  );
})
export default MainComp;
