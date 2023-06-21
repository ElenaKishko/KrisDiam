import { Route, Routes} from "react-router-dom"
import { useEffect, useState } from "react"
import { imgStorage, auth, db, app} from "./firebase"
import { getFirestore, collection, query, where, getDocs, doc,setDoc } from "firebase/firestore"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { useDispatch } from "react-redux"

import MainComp from "./Main.js"
import ProductsComp from "./Products.js"
import ProductComp from "./Product.js"
import AboutComp from "./About.js"
import HeaderComp from "./Header"
import FooterComp from "./Footer"
import BasketComp from "./Basket"
import ProductsByCategoryComp from "./ProductsByCategory"


function HostComp() {
  const dispatch = useDispatch()
  const wholeCollection = []

  useEffect(() => {
    getCollection()
  },[])

  const getCollection = async () =>
  {
    const querySnapshot = await getDocs(query(collection(db, "KrisDiam")))
    querySnapshot.forEach((doc) => {
      let obj = {
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                type: doc.data().type,
                gemstone: doc.data().gemstone,
                url: doc.data().url,
                qty:0,
                specs: doc.data().specs
      };
      wholeCollection.push(obj)
    })
    dispatch({type:"LOADCOLLECTION", payload: wholeCollection})
  }
  

  return (
    <>
      <HeaderComp/>
      <Routes>
        <Route path="/" element={<MainComp/>}/>
        <Route path="/products" element={<ProductsComp />}/>
        <Route path="/products/:category" element={<ProductsByCategoryComp/>}/>
        <Route path="/product/:id" element={<ProductComp/>}/>
        <Route path="/about" element={<AboutComp/>}/>
        <Route path="/basket" element={<BasketComp/>}/>
      </Routes>
      <FooterComp/>
    </>
  );
}
export default HostComp;
