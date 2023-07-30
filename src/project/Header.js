import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { CartStore } from "./stores";
import { logo, basket } from "./images";
import { useSelector } from "react-redux";
import * as Icons from "react-icons/fi";
import { Container } from "@mui/material";

const Header = observer(() => {
  const storeData = useSelector((state) => state);
  let categories = [
    ...new Set(storeData.wholeCollection.map((product) => product.type)),
  ];
  const [isActive, setIsActive] = useState(false);
  let dropdownClose = useRef();
  //fuction to close the dropdown when clicking outside of it
  useEffect(() => {
    let handler = (e) => {
      if (!dropdownClose.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  //dynamic dropdown loading
  let shopList =
    categories.length > 0 &&
    categories.map((item, i) => {
      return (
        <div
          className="header_dropdown_item"
          onClick={() => setIsActive(false)}
        >
          <Link to={"/products/" + item}>{item}</Link>
        </div>
      );
    });

  return (
    <header className="header">
      <Container>
        <div className="wrapper">
          <div>
            <div className="header_logo">
              <Link to="/">
                <img className="header_img" src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div>
            <nav>
              <ul className="header_menu">
                <li className="header_menu_item">
                  <Link className="header_menu_link" to="/">
                    Home
                  </Link>
                </li>
                <li className="header_menu_item">
                  <div
                    className="header_dropdown"
                    onClick={() => setIsActive(!isActive)}
                  >
                    <span>Shop</span>
                    <div className="header_dropdown_btn">
                      <Icons.FiChevronDown />
                    </div>
                    {isActive && (
                      <div
                        className="header_dropdown_content"
                        ref={dropdownClose}
                      >
                        <div
                          className="header_dropdown_item"
                          onClick={() => setIsActive(false)}
                        >
                          <Link to="/products">Everything</Link>
                        </div>
                        {shopList}
                      </div>
                    )}
                  </div>
                </li>
                <li className="header_menu_item">
                  <Link className="header_menu_link" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <div className="header_icons">
              {/* <a href="#"><img src={search} alt="search"/></a> */}
              {/* <a href="#"><img src={profile} alt="profile"/></a> */}
              <Link to="/basket" className="header_icons_basket">
                {/* <img src={basket} alt="basket" /> */}
                <Icons.FiShoppingCart />
                <span>{CartStore.cartCounter}</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
});
export default Header;
