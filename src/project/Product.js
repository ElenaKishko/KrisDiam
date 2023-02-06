import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap-grid.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FooterComp from "./Footer"
import HeaderComp from "./Header"
import purpleGrapeSet from '../img/photos/purple grape set.jpeg'
import arrow from '../img/icons/arrow-down-2.svg'

function ProductComp() {

  const [openSpecs, setOpenSpecs] = useState(false)
  const toggleSpecs = () => {
    setOpenSpecs(!openSpecs)
  }

  const [openShipping, setOpenShipping] = useState(false)
  const toggleShipping = () => {
    setOpenShipping(!openShipping)
  }

  return (
    <div className="App">
      <div className="main_wrapper">
        <HeaderComp/>
        <section className="product">
          <Container>
            <div className="product_nav"><Link to="/products">Fine Jewelry</Link></div>
            <Row>
              <Col lg={7}>
                <div className="product_img">
                  <img src={purpleGrapeSet} alt="purple grape set" />
                </div>
              </Col>
              <Col lg={{span: 4, offset: 1}}>
                <div className="product_info">
                  <div className="product_info_title">Pink Grapes Set</div>
                  <div className="product_info_price">300 nis</div>
                  <div className="product_info_descr">Set is made from pink ruby stone and silver</div>
                  <Link to="#"><button className="product_info_btn">Add To Cart</button></Link>
                  <div className="product_info_divider"></div>
                  <div className="product_info_specsAndShipping">
                    <div className='product_info_wrapper'>
                      <div className='product_info_title'>Specifications</div>
                      <button className={openSpecs ? 'product_info_arrow_active' : 'product_info_arrow'} onClick={toggleSpecs}><img src={arrow} alt='arrow'/></button>
                    </div>
                    {
                      openSpecs && (
                        <ul>
                          <li>Made from sterling silver</li>
                          <li>pendant size: 25mm</li>
                          <li>earring size: 30mm</li>
                          <li>Chain adjustable in three lengths: 41-43-45cm</li>
                        </ul>
                      )
                    }
                  </div>
                  <div className="product_info_divider"></div>
                  <div className="product_info_specsAndShipping">
                    <div className='product_info_wrapper'>
                      <div className='product_info_title'>Shipping and Returns</div>
                      <button className={openShipping ? 'product_info_arrow_active' : 'product_info_arrow'} onClick={toggleShipping}><img src={arrow} alt='arrow'/></button>
                    </div>
                    {
                      openShipping && (
                        <ul>
                          <li>Made from sterling silver</li>
                          <li>pendant size: 25mm</li>
                          <li>earring size: 30mm</li>
                          <li>Chain adjustable in three lengths: 41-43-45cm</li>
                        </ul>
                      )
                    }
                  </div>
                  <div className="product_info_divider"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <FooterComp/>
      </div>
    </div>
  );
}
export default ProductComp;
