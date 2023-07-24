import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, DataGrid } from "@mui/material";
import { ProductCardAdmin } from "./components";
import { storage, db } from "./stores";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { collection, addDoc, arrayUnion } from "firebase/firestore";
import { v4 } from "uuid";

const AdminMain = () => {
  const storeData = useSelector((state) => state);
  const [products, setProducts] = useState([]);
  const [detailsArr, setDetailsArr] = useState([""]);
  const [photosArr, setPhotosArr] = useState([""]);

  // const [imageUpload, setImageUpload] = useState(null);
  // const [imageList, setImageList] = useState([]);

  const collectionRef = collection(db, "KrisDiam");
  const initialState = {
    name: "",
    price: 0,
    description: "",
    gemstone: "",
    type: "",
    details: [],
    url: [],
  };
  const [newProduct, setNewProduct] = useState(initialState);
  const photosListRef = ref(storage, `${newProduct.name}/`);
  //load products from redux
  useEffect(() => {
    setProducts(storeData.wholeCollection);
  }, [storeData.wholeCollection]);

  //save product details inputs in array detailsArr and then in object newProduct
  const hadleDetailsInput = (e, index) => {
    const detailsArrCopy = [...detailsArr];
    detailsArrCopy[index] = e.target.value;
    setDetailsArr(detailsArrCopy);
    setNewProduct({ ...newProduct, details: detailsArrCopy });
  };

  //save product details inputs in array photosArr and then in object newProduct
  const hadlePhotosInput = (e, index) => {
    const photosArrCopy = [...photosArr];
    photosArrCopy[index] = e.target.files[0];
    if (photosArrCopy[index] == "") return;
    const imageRef = ref(
      storage,
      `${newProduct.name}/${photosArrCopy[index].name + v4()}`
    );
    uploadBytes(imageRef, photosArrCopy[index]).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setPhotosArr((prev) => [...prev, url]);
      });
    });

    // setPhotosArr(photosArrCopy);
    // setNewProduct({ ...newProduct, url: photosArrCopy });
  };

  //upload new product to firestore database
  const addNewProduct = (e) => {
    e.preventDefault();
    listAll(photosListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPhotosArr((prev) => [...prev, url]);
        });
      });
    });
    addDoc(collectionRef, {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      gemstone: newProduct.gemstone,
      type: newProduct.type,
      specs: newProduct.details,
      url: photosArr,
    }).then(() => {
      document.querySelector('[name="name"]').value = "";
      document.querySelector('[name="price"]').value = "";
      document.querySelector('[name="description"]').value = "";
      document.querySelector('[name="gemstone"]').value = "";
      document.querySelector('[name="type"]').value = "";
      document.querySelector('[name="photo_0"]').value = "";
      setDetailsArr([""]);
      setPhotosArr([""]);
      setNewProduct({ ...initialState });
    });
  };
  return (
    <div className="main_wrapper">
      <Container>
        <div className="admin">
          <h3>Add new product:</h3>
          <div className="newProduct">
            name:
            <input
              type="text"
              name="name"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
            />
            <br />
            price:
            <input
              type="number"
              name="price"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: +e.target.value,
                })
              }
            />
            <br />
            description:
            <input
              type="text"
              name="description"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
            />
            <br />
            gemstone:
            <input
              type="text"
              name="gemstone"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  gemstone: e.target.value,
                })
              }
            />
            <br />
            type:
            <input
              type="text"
              name="type"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  type: e.target.value,
                })
              }
            />
            <br />
            details:
            <br />
            {detailsArr.map((item, index) => (
              <>
                <input
                  key={index}
                  type="text"
                  name={"detail_" + index}
                  value={item}
                  onChange={(e) => hadleDetailsInput(e, index)}
                />
                <br />
              </>
            ))}
            <br />
            <button onClick={() => setDetailsArr([...detailsArr, ""])}>
              Add product's detail
            </button>
            <br />
            upload photo:
            <br />
            {photosArr.map((item, index) => (
              <>
                <input
                  key={index}
                  name={"photo_" + index}
                  accept="image/*"
                  type="file"
                  onChange={(e) => hadlePhotosInput(e, index)}
                />
                <br />
              </>
            ))}
            <br />
            <button onClick={() => setPhotosArr([...photosArr, ""])}>
              Add product's photo
            </button>
            <br /> <br />
            <button onClick={addNewProduct}>Add product to database</button>
          </div>

          <h3>Products:</h3>
          {products.map((item, index) => {
            return <ProductCardAdmin key={index} product={item} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default AdminMain;
