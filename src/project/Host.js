import firebase from "./firebase"
import { Route, Routes} from "react-router-dom"
import { useState } from "react"


import MainComp from "./Main.js"
import ProductsComp from "./Products.js"
import ProductComp from "./Product.js"
import AboutComp from "./About.js"

function HostComp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainComp/>}/>
        <Route path="/products" element={<ProductsComp/>}/>
        <Route path="/product" element={<ProductComp/>}/>
        <Route path="/about" element={<AboutComp/>}/>
      </Routes>
    </div>
  );
}
export default HostComp;
