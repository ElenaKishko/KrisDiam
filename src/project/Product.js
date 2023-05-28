import React, { useEffect } from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap-grid.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import arrow from '../img/icons/arrow-down-2.svg'
import { action } from "mobx"
import { CartStore } from './CartStore'
import { useDispatch } from "react-redux"

function ProductComp() {
  const storeData = useSelector(state => state)
  const dispatch = useDispatch()
  const params = useParams()
  let id = params.id
  const product = storeData.wholeCollection.find((item) => item.id === id)
 
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
        <section className="product">
          <Container>
            <div className="product_nav">
              <Link to="/products">Fine Jewelry</Link>
              <span> / </span>
              <Link  to={"/products/" + product.type}>{product.type}</Link>
            </div>
            <Row>
              <Col lg={7}>
                <div className="product_img">
                  <img src={product.url} alt="purple grape set" />
                </div>
              </Col>
              <Col lg={{span: 4, offset: 1}}>
                <div className="product_info">
                  <div className="product_info_title">{product.name}</div>
                  <div className="product_info_price">{product.price}</div>
                  <div className="product_info_descr">Set is made from pink ruby stone and silver</div>
                  {
                    product.qty == 0 ? 
                          <button className="product_info_btn" onClick={action(() =>{
                          {dispatch({type:"INCREASEQTY", payload: product})}
                          {CartStore.addToCart(product)}
                          })}>Add To Cart</button> : 
                          <div className="product_info_btn_qty">
                            <button  onClick={action(() =>{
                                              {dispatch({type:"DECREASEQTY", payload: product})}
                                              {CartStore.removeFromCart(product)}
                                              })}> - </button>
                            <button >{product.qty}</button>
                            <button  onClick={action(() =>{
                                              {dispatch({type:"INCREASEQTY", payload: product})}
                                              {CartStore.addToCart(product)}
                                              })}> + </button>
                          </div>
                  }
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
      </div>
    </div>
  );
}
export default ProductComp;
