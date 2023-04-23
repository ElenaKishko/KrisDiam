import { observer } from "mobx-react"
import { CartStore } from './CartStore'
import {useSelector} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BasketItemComp from "./BasketItem"
import { useEffect, useState } from "react"

const BasketComp = observer(() => {
    const storeData = useSelector(state => state)
    const [cartProducts,setCartProducts] = useState()

    useEffect(() =>
    {
        async function getProducts()
        { 
            let arr = []
            CartStore.cartItems.map( item =>
                {
                    arr.push(storeData.wholeCollection.find((x) => x.id === item.id))                   
                })
                setCartProducts(arr)
        }
        getProducts()
        console.log(cartProducts)
    },[CartStore.cartCounter])
    
    return (
        <div className="App">
            <div className="main_wrapper">
                <Container>
                    <div className="basket">
                        <div className="basket_header">{CartStore.cartCounter > 0 ? CartStore.cartCounter + " items in your cart" : "Your cart is emty"}</div>
                        <Row>
                            <Col lg={7}>
                            {
                                CartStore.cartItems.map(item =>
                                    {
                                        return<div key={item.id}>
                                            <BasketItemComp key={item.id} product={item}/>
                                        </div>
                                    }

                                )
                            }
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