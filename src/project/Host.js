import { Route, Routes} from "react-router-dom"
import { useEffect, useState } from "react"
import { imgStorage, auth, db, app} from "./firebase"
import { getFirestore, collection, query, where, getDocs, doc } from "firebase/firestore"
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
    let q = query(collection(db, "KrisDiam"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      let obj = {
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                type: doc.data().type,
                gemstone: doc.data().gemstone,
                url: doc.data().url
      };
      wholeCollection.push(obj)
    })
    dispatch({type:"LOADCOLLECTION", payload: wholeCollection})
  }

  //Cart add/remove
  const [cartItems, setCartItems] = useState([])
  const addToCart = async (product) =>
  {
    console.log(product.id)
    const exist = cartItems.find((x) => x.id === product.id)
    if(exist){
      const newCartItems = cartItems.map((x) =>
      x.id === product.id ? {...exist,qty: exist.qty +1} : x
      )
      setCartItems(newCartItems)
    }
  }
  const removeFromCart = async () =>
  {
    
  }

  return (
    <div className="App">
      <HeaderComp/>
      <Routes>
        <Route path="/" element={<MainComp/>}/>
        <Route path="/products" element={<ProductsComp addToCart={addToCart} />}/>
        <Route path="/products/:category" element={<ProductsByCategoryComp/>}/>
        <Route path="/product/:id" element={<ProductComp/>}/>
        <Route path="/about" element={<AboutComp/>}/>
        <Route path="/basket" element={<BasketComp/>}/>
      </Routes>
      <FooterComp/>
    </div>
  );
}
export default HostComp;
