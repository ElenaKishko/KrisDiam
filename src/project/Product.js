import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Container, Grid } from "@mui/material";
import { action } from "mobx";
import { CartStore } from "./stores";
import { Slider } from "./components";
import * as Icons from "react-icons/vsc";

function Product() {
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();
  const params = useParams();
  let id = params.id;
  const product = storeData.wholeCollection.find((item) => item.id === id);
  const productPhotos = product.url;
  const [openSpecs, setOpenSpecs] = useState(false);
  const toggleSpecs = () => {
    setOpenSpecs(!openSpecs);
  };

  const [openShipping, setOpenShipping] = useState(false);
  const toggleShipping = () => {
    setOpenShipping(!openShipping);
  };

  return (
    <>
      <div className="main_wrapper">
        <section className="product">
          <Container>
            <div className="product_nav">
              <Link to="/products">Fine Jewelry</Link>
              <span> / </span>
              <Link to={"/products/" + product.type}>{product.type}</Link>
            </div>
            <Row>
              <Col className="product_slider" lg={4}>
                <div className="product_img">
                  <Slider slides={productPhotos} />
                  {/* <img src={product.url} alt={product.name} /> */}
                </div>
              </Col>
              <Col lg={{ span: 4, offset: 2 }}>
                <div className="product_info">
                  <div className="product_info_title">{product.name}</div>
                  <div className="product_info_price">{product.price} nis</div>
                  <div className="product_info_descr">
                    {product.description}
                  </div>
                  {product.qty == 0 ? (
                    <button
                      className="product_info_btn"
                      onClick={action(() => {
                        {
                          dispatch({ type: "INCREASEQTY", payload: product });
                        }
                        {
                          CartStore.addToCart(product);
                        }
                      })}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <div className="product_info_btn_qty">
                      <button
                        onClick={action(() => {
                          {
                            dispatch({ type: "DECREASEQTY", payload: product });
                          }
                          {
                            CartStore.removeFromCart(product);
                          }
                        })}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <button>{product.qty}</button>
                      <button
                        onClick={action(() => {
                          {
                            dispatch({ type: "INCREASEQTY", payload: product });
                          }
                          {
                            CartStore.addToCart(product);
                          }
                        })}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  )}
                  <div className="product_info_divider"></div>

                  <div className="product_info_specsAndShipping">
                    <div className="product_info_wrapper">
                      <div className="product_info_title">Specifications</div>
                      <button
                        className={
                          openSpecs
                            ? "product_info_arrow_active"
                            : "product_info_arrow"
                        }
                        onClick={toggleSpecs}
                      >
                        <Icons.VscTriangleDown />
                      </button>
                    </div>
                    <ul className="product_info_specs">
                      {openSpecs &&
                        product.specs &&
                        product.specs.map((item) => {
                          return (
                            <li className="product_info_specs_item" key={item}>
                              {item}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="product_info_divider"></div>
                  {/* <div className="product_info_specsAndShipping">
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
                  <div className="product_info_divider"></div> */}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}
export default Product;
