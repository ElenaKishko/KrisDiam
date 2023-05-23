import { observer } from "mobx-react"
import { CartStore } from './CartStore'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BasketItemComp from "./BasketItem"

const BasketComp = observer(() => {
    
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
                                <div className="basket_subtotal">{CartStore.subTotalCounter > 0 ? "Sub-Total: " + CartStore.subTotalCounter : ""}</div>
                            </Col>
                            <Col lg={{span: 4, offset: 1}}>
                                <section classname="basket_payment">
                                    <div className="basket_payment_header">How you'll pay</div>
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


