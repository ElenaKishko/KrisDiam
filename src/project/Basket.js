import { observer } from "mobx-react"
import { CartStore } from './CartStore'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BasketItemComp from "./BasketItem"
import visa from "../img/icons/visa.svg"

const BasketComp = observer(() => {
    console.log(CartStore.cartItems);
    return (
        <div className="App">
            <div className="main_wrapper">
                <Container>
                    <div className="basket">
                       
                        <Row>
                            <Col lg={7}>
                                <div className="basket_header">{CartStore.cartCounter > 0 ? CartStore.cartCounter + " items in your cart" : "Your cart is emty"}</div>
                                {
                                    CartStore.cartItems.map(item =>
                                        {
                                            return<div key={item.id}>
                                                <BasketItemComp key={item.id} product={item}/>
                                            </div>
                                        }

                                    )
                                }
                                <div className="basket_subtotal">{CartStore.subTotalCounter > 0 ? "Order value: " + CartStore.subTotalCounter + " nis": ""}</div>
                            </Col>
                            <Col lg={{span: 4, offset: 1}}>
                                <section classname="basket_payment">
                                    <div className="basket_payment_header">How you'll pay</div>
                                
                                    <form className="credit-card">
                                        <div className="front">
                                            <div className="card-data-row">
                                                <div className="brand-name">Leumi</div>
                                                <img src={visa} className="logo" />
                                            </div>
                                            <fieldset className="form-group">
                                                <legend>Card Number</legend>
                                                <label htmlFor="cc-1">Card Number</label>
                                                <div className="cc-inputs">
                                                    <input type="tel" maxLength="4" aria-label="Credit Card First 3 Digits" id="cc-1" required pattern="[0-9]{4}"/>
                                                    <input type="tel" maxLength="4" aria-label="Credit Card Second 3 Digits" required pattern="[0-9]{4}"/>
                                                    <input type="tel" maxLength="4" aria-label="Credit Card Third 3 Digits" required pattern="[0-9]{4}"/>
                                                    <input type="tel" maxLength="4" aria-label="Credit Card Last 3 Digits" required pattern="[0-9]{4}"/>
                                                </div>
                                            </fieldset>
                                            <div className="input-row">
                                                <div className="form-group name-group">
                                                    <div htmlFor="name">Name</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="basket_credit_card_back"></div>
                                    </form>
                                </section>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )  
})
export default BasketComp


