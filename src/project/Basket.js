import { observer } from "mobx-react"
import { CartStore } from './CartStore'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BasketItemComp from "./BasketItem"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

const BasketComp = observer(() => {
    console.log(CartStore.cartItems);
    return (
        <>
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
                                <PayPalScriptProvider options={{
                                    "client-id":
                                     "AWPxbKx-hEXsS_sP92l9b_EmmGLLuLBzfe9UR0-W8rZ4KkNeSfaLlpLOMiz5aJZLBF_hVs7yfnBqbcYz"}}>
                                    <PayPalButtons 
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units:[
                                                {
                                                    amount: {
                                                        value: CartStore.subTotalCounter,
                                                        currency: "ILS",
                                                    }
                                                }
                                            ]
                                        })
                                    }}/>
                                </PayPalScriptProvider>
                                </section>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    )  
})
export default BasketComp


