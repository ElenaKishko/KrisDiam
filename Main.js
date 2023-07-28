import { useState } from "react";
import { Link } from "react-router-dom";
import {
  main,
  mainMobile,
  shopEarrings,
  shopPendants,
  shopRings,
  shopSets,
} from "./images";
import { observer } from "mobx-react";
import { action } from "mobx";
import { FilterStore } from "./stores";
import { ContactMe } from "./components";
import { Row, Col, Card } from "react-bootstrap";
import { Container, Grid } from "@mui/material";

const Main = observer(() => {
  const customSubmit = (e) => {
    e.preventDefault();
  };

  const [userMessage, setUserMessage] = useState({
    name: "",
    mobile: "",
    message: "",
  });
  const [categories, setCategories] = useState();

  let shopSectionArr = [
    { name: "sets", img: shopSets },
    { name: "earrings", img: shopEarrings },
    { name: "rings", img: shopRings },
    { name: "pendants", img: shopPendants },
  ];

  return (
    <div className="main_wrapper">
      <section className="explore">
        <img className="explore_img" src={main} alt="main image" />
        <img className="explore_img_mobile" src={mainMobile} alt="main image" />
        <Container className="explore_container">
          <div className="explore_descr">
            Handcrafted earrings, necklaces and rings from silver and semi
            precious stones
          </div>
          <Link to="/products">
            <button className="explore_btn">Explore</button>
          </Link>
        </Container>
      </section>
      <section className="shop">
        <Container>
          <div className="shop_title">Shop by category</div>
          {/* <Row xs={2} md={2} lg={4} className="shop_categories"> */}
          <Grid container spacing={3} className="shop_categories">
            {shopSectionArr.map((item, key) => {
              return (
                <Grid item key={item} xs={6} md={3}>
                  <Card className="shop_categories_item">
                    <Card.Title className="shop_categories_item_title">
                      {item.name}
                    </Card.Title>
                    <Link
                      to={"/products/" + item.name}
                      className="shop_categories_item_img"
                    >
                      <Card.Img src={item.img} />
                    </Link>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {/* </Row> */}
        </Container>
      </section>
      <section>
        <ContactMe />
      </section>
    </div>
  );
});
export default Main;
