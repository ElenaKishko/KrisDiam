import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { imgStorage, auth, db, app } from "./stores";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  Main,
  Products,
  Product,
  About,
  Header,
  Footer,
  Basket,
  ProductsByCategory,
  AdminMain,
  EditProduct,
} from "./components";

function Host() {
  const dispatch = useDispatch();
  const wholeCollection = [];

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    const querySnapshot = await getDocs(query(collection(db, "KrisDiam")));
    querySnapshot.forEach((doc) => {
      let obj = {
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        type: doc.data().type,
        gemstone: doc.data().gemstone,
        description: doc.data().description,
        url: doc.data().url,
        qty: doc.data().qty,
        specs: doc.data().specs,
      };
      wholeCollection.push(obj);
    });
    dispatch({ type: "LOADCOLLECTION", payload: wholeCollection });
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<ProductsByCategory />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/admin/product/:id" element={<EditProduct />} />
      </Routes>
      <Footer />
    </>
  );
}
export default Host;
