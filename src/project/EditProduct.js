import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { storage, db } from "./stores";
import { v4 } from "uuid"; //generator of unique sequence for names of uploaded photos
import { Container, TextField, Button } from "@mui/material";
import * as Icons from "react-icons/md";

const EditProduct = () => {
  const storeData = useSelector((state) => state);
  const params = useParams();
  let id = params.id;
  const product = storeData.wholeCollection.find((item) => item.id === id);

  const [specsArr, setSpecsArr] = useState(product.specs);
  const [photosArr, setPhotosArr] = useState(product.url);
  const [newPhoto, setNewPhoto] = useState("");
  const collectionRef = collection(db, "KrisDiam");
  const initialState = {
    name: product.name,
    price: product.price,
    description: product.description,
    gemstone: product.gemstone,
    type: product.type,
    specs: product.specs,
    url: product.url,
    qty: product.qty,
    cartQty: product.cartQty,
  };
  const [updatedProduct, setUpdatedProduct] = useState(initialState);

  //save product specs inputs in array specsArr and then in object updatedProduct
  const hadleSpecsInput = (e, index) => {
    const specsArrCopy = [...specsArr];
    specsArrCopy[index] = e.target.value;
    setSpecsArr(specsArrCopy);
    setUpdatedProduct({ ...updatedProduct, specs: specsArrCopy });
  };

  //save product photo urls in array photosArr and then in object updatedProduct
  const hadlePhotosInput = () => {
    if (newPhoto == "") return;
    let newPhotoCopy = newPhoto;
    // reference to uploaded photo
    const imageRef = ref(storage, `${product.name}/${newPhoto.name + v4()}`);

    //get and save url of uploaded photo
    uploadBytes(imageRef, newPhoto).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        newPhotoCopy = url;
      });
    });
    //update photosArr and product states
    setTimeout(() => {
      setPhotosArr([...photosArr, newPhotoCopy]);
      setUpdatedProduct({
        ...updatedProduct,
        url: [...updatedProduct.url, newPhotoCopy],
      });
      document.querySelector('[name="new_photo"]').value = "";
    }, 4000);
  };

  //upload new product to firestore database
  const updateProduct = async (e) => {
    e.preventDefault();

    await setDoc(doc(collectionRef, product.id), {
      //upload updated document to database
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      gemstone: updatedProduct.gemstone,
      type: updatedProduct.type,
      specs: updatedProduct.specs,
      url: updatedProduct.url,
      qty: updatedProduct.qty,
      cartQty: updatedProduct.cartQty,
    }).then(() => {
      alert("Product was successfully updated");
    });
  };

  const deleteSpec = (index) => {
    const specsArrCopy = [...specsArr];
    specsArrCopy.splice(index, 1);
    setSpecsArr(specsArrCopy);
    setUpdatedProduct({ ...updatedProduct, specs: specsArrCopy });
  };

  const deletePhoto = (index) => {
    const photosArrCopy = [...photosArr];
    photosArrCopy.splice(index, 1);
    setPhotosArr(photosArrCopy);
    setUpdatedProduct({ ...updatedProduct, url: photosArrCopy });
  };
  return (
    <>
      <div className="main_wrapper">
        <Container>
          <div className="admin_form">
            <h3>Update product:</h3>
            <div className="updatedProduct">
              <TextField
                label="Name"
                size="small"
                sx={{ m: 1 }}
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <TextField
                label="Price ₪"
                size="small"
                sx={{ m: 1 }}
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: +e.target.value,
                  })
                }
              />
              <TextField
                label="Gemstone"
                size="small"
                sx={{ m: 1 }}
                type="text"
                name="gemstone"
                value={updatedProduct.gemstone}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    gemstone: e.target.value,
                  })
                }
              />
              <TextField
                label="Type"
                size="small"
                sx={{ m: 1 }}
                type="text"
                name="type"
                value={updatedProduct.type}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    type: e.target.value,
                  })
                }
              />
              <TextField
                label="Quantity"
                size="small"
                sx={{ m: 1 }}
                type="number"
                name="qty"
                value={updatedProduct.qty}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    qty: +e.target.value,
                  })
                }
              />
              <br />
              <div className="admin_specs">
                {specsArr.map((item, index) => (
                  <div className="admin_spec">
                    <TextField
                      label="Details"
                      size="small"
                      sx={{ m: 1 }}
                      key={index}
                      type="text"
                      name={"detail_" + index}
                      value={item}
                      onChange={(e) => hadleSpecsInput(e, index)}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => deleteSpec(index)}
                    >
                      <Icons.MdDeleteOutline />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outlined"
                sx={{ m: 1 }}
                onClick={() => setSpecsArr([...specsArr, ""])}
              >
                Add product's detail
              </Button>
              <br />
              <TextField
                label="Description "
                multiline
                size="small"
                sx={{ m: 1 }}
                type="text"
                name="description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
              />
              <h4> product photos:</h4>
              <div className="admin_photos">
                {photosArr.map((item, index) => (
                  <div className="admin_photo">
                    <img style={{ width: 200 }} src={item} />
                    <Button
                      variant="outlined"
                      onClick={() => deletePhoto(index)}
                    >
                      Delete Photo
                      <Icons.MdDeleteOutline />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="admin_photo_upload">
                <TextField
                  size="small"
                  sx={{ m: 1 }}
                  name={"new_photo"}
                  accept="image/*"
                  type="file"
                  onChange={(e) => setNewPhoto(e.target.files[0])}
                />
                <Button
                  variant="outlined"
                  sx={{ m: 1, marginTop: 4 }}
                  onClick={hadlePhotosInput}
                >
                  Add photo
                </Button>
              </div>
              <br />
              <br />
              <Button
                className="admin_form_submit"
                variant="contained"
                sx={{ m: 1, display: "block", m: "auto", marginBottom: 5 }}
                onClick={updateProduct}
              >
                Update Product
              </Button>

              <Link to="/kris">
                <Button
                  className="admin_back"
                  variant="contained"
                  sx={{
                    m: 1,
                    display: "block",
                    m: "auto",
                    marginBottom: 5,
                  }}
                >
                  back to admin page
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EditProduct;
