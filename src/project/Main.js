import { useState } from "react"
import ProductsComp from "./Products.js"
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


function MainComp() {
  
  const customSubmit = (e) =>
  {
    e.preventDefault();
  }

  const [userMessage, setUserMessage] = useState({name: '', mobile: '', message: ''})

  return (
    <div className="App">
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
                <div className="shop_categories_item_img"><img src={purpleSet}></img></div>
              </div>
              <div className="shop_categories_item">
                <div className="shop_categories_item_title">Earrings</div>
                <div className="shop_categories_item_img"><img src={purpleEarrings}></img></div>
              </div>
              <div className="shop_categories_item">
                <div className="shop_categories_item_title">Rings</div>
                <div className="shop_categories_item_img"><img src={ring}></img></div>
              </div>
            </div>
          </Container>
        </section>
        <section className="contact">
          <Container>
            <Row className="contact_wrapper">
              <Col className="contact_img"><img src={pinkSet}></img></Col>
              <Col className="contact_descr">
                <div className="contact_descr_title">Contact me for individual order</div>
                <div className="contact_descr_text">For any question, individual design 
                  or suggestion please fill the form, and I will message you back as 
                  soon as possible.</div>
              </Col>
              <Col className="contact_form">
                <form onSubmit={e => customSubmit(e)}>
                  <input type="text" placeholder="Your name"/>
                  <input type="text" placeholder="Your mobile number"/>
                  <textarea type="text" placeholder="Message"/>
                  <input type="submit" value="Submit" />
                </form>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
}
export default MainComp;
