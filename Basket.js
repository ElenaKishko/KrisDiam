import { observer } from "mobx-react";
import { CartStore } from "./stores";
import { Row, Col } from "react-bootstrap";
import { Container, Grid } from "@mui/material";
import { BasketItem } from "./components";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Basket = observer(() => {
  console.log(CartStore.cartItems);
  return (
    <>
      <div className="main_wrapper">
        {/* <Container>
          <div className="basket">
            <Row>
              <Col lg={7}>
                {CartStore.subTotalCounter > 0 ? (
                  <div className="basket_subtotal">
                    <div className="basket_subtotal_text">Bag sub-total</div>
                    <div className="basket_subtotal_price">
                      {CartStore.subTotalCounter} nis
                    </div>
                  </div>
                ) : (
                  <div className="basket_subtotal_empty">Cart is empty</div>
                )}
                {CartStore.cartItems.map((item) => {
                  return (
                    <div key={item.id}>
                      <BasketItem key={item.id} product={item} />
                    </div>
                  );
                })}
              </Col>
              <Col lg={{ span: 4, offset: 1 }}>
                <section classname="basket_payment">
                  <div className="basket_payment_header">How you'll pay</div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AWPxbKx-hEXsS_sP92l9b_EmmGLLuLBzfe9UR0-W8rZ4KkNeSfaLlpLOMiz5aJZLBF_hVs7yfnBqbcYz",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: CartStore.subTotalCounter,
                                currency: "ILS",
                              },
                            },
                          ],
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </section>
              </Col>
            </Row>
          </div>
        </Container> */}
        <Container className="basket_container">
          <Grid
            container
            spacing={2}
            className="basket"
            sx={{ justifyContent: "space-evenly", alignItems: "flex-start" }}
          >
            <Grid item sm={12} md={3}>
              {CartStore.subTotalCounter > 0 ? (
                <div className="basket_subtotal">
                  <div className="basket_subtotal_text">Bag sub-total</div>
                  <div className="basket_subtotal_price">
                    {CartStore.subTotalCounter} nis
                  </div>
                </div>
              ) : (
                <div className="basket_subtotal_empty">Cart is empty</div>
              )}
              {CartStore.cartItems.map((item) => {
                return (
                  <div key={item.id}>
                    <BasketItem key={item.id} product={item} />
                  </div>
                );
              })}
            </Grid>
            <Grid item sm={12} md={3}>
              <section classname="basket_payment">
                <div className="basket_payment_header">Payment options:</div>
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AWPxbKx-hEXsS_sP92l9b_EmmGLLuLBzfe9UR0-W8rZ4KkNeSfaLlpLOMiz5aJZLBF_hVs7yfnBqbcYz",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: CartStore.subTotalCounter,
                              currency: "ILS",
                            },
                          },
                        ],
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </section>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
});
export default Basket;
