import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { storage, db } from "./stores";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { v4 } from "uuid"; //generator of unique sequence for names of uploaded photos
import * as Icons from "react-icons/ci";
import { VscErrorSmall } from "react-icons/vsc";

const AdminMain = () => {
  const storeData = useSelector((state) => state);
  const [products, setProducts] = useState([]);
  const [specsArr, setSpecsArr] = useState([""]);
  const [photosArr, setPhotosArr] = useState([]);
  const [newPhoto, setNewPhoto] = useState("");

  const collectionRef = collection(db, "KrisDiam");
  const initialState = {
    name: "",
    price: 0,
    description: "",
    gemstone: "",
    type: "",
    specs: [],
    url: [],
    qty: 0,
    cartQty: 0,
  };
  const [newProduct, setNewProduct] = useState(initialState);
  //reference to new folder in firebase storage with the name of product entered by admin
  const photosListRef = ref(storage, `${newProduct.name}/`);

  //load products from redux
  useEffect(() => {
    setProducts(storeData.wholeCollection);
  }, [storeData.wholeCollection]);

  //save product specs inputs in array specsArr and then in object newProduct
  const hadleSpecsInput = (e, index) => {
    const specsArrCopy = [...specsArr];
    specsArrCopy[index] = e.target.value;
    setSpecsArr(specsArrCopy);
    setNewProduct({ ...newProduct, specs: specsArrCopy });
  };

  //save product photo urls in array photosArr and then in object updatedProduct
  const hadlePhotosInput = async () => {
    if (newPhoto == "") return;
    let newPhotoCopy = newPhoto;

    //reference to uploaded photo
    const imageRef = ref(storage, `${newProduct.name}/${newPhoto.name + v4()}`);

    //get and save url of uploaded photo
    await uploadBytes(imageRef, newPhoto).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        newPhotoCopy = url;
      });
    });
    //update photosArr and product states
    setTimeout(() => {
      if (photosArr[0] === "") {
        setPhotosArr([newPhotoCopy]);
      } else {
        setPhotosArr([...photosArr, newPhotoCopy]);
      }

      setNewProduct({
        ...newProduct,
        url: [...newProduct.url, newPhotoCopy],
      });
      document.querySelector('[name="new_photo"]').value = "";
    }, 3000);
  };
  //remove photo from photosArr
  const deletePhoto = (index) => {
    const photosArrCopy = [...photosArr];
    photosArrCopy.splice(index, 1);
    setPhotosArr(photosArrCopy);
    setNewProduct({ ...newProduct, url: photosArrCopy });
  };
  //upload new product to firestore database
  const addNewProduct = (e) => {
    e.preventDefault();

    addDoc(collectionRef, {
      //upload new document to database
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      gemstone: newProduct.gemstone,
      type: newProduct.type,
      specs: newProduct.specs,
      url: newProduct.url,
      qty: newProduct.qty,
      cartQty: 0,
    }).then(() => {
      //reset "new product" form
      document.querySelector('[name="name"]').value = "";
      document.querySelector('[name="price"]').value = "";
      document.querySelector('[name="description"]').value = "";
      document.querySelector('[name="gemstone"]').value = "";
      document.querySelector('[name="type"]').value = "";
      document.querySelector('[name="new_photo"]').value = "";
      document.querySelector('[name="qty"]').value = "";
      setSpecsArr([""]);
      setPhotosArr([""]);
      setNewProduct({ ...initialState });
    });
  };
  //delete product and photos form database
  const deleteProduct = async (id) => {
    const docRef = doc(collectionRef, id);
    const product = await storeData.wholeCollection.find(
      (item) => item.id === id
    );
    const folderName = product.name;
    const photos = product.url;

    //delete photos and their folder form firebase storage
    const storage = getStorage();
    photos.map((photo) => {
      const splitSegments = photo.split("%2F");
      const lastSegment = splitSegments[splitSegments.length - 1];
      const photoName = lastSegment.split("?")[0];
      console.log(photoName);
      const photoRef = ref(storage, `${folderName}/${photoName}`);
      deleteObject(photoRef)
        .then(() => {
          console.log("photos folder was deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    //delete product(document) from firestore database
    await deleteDoc(docRef)
      .then(() => {
        // setProducts(storeData.wholeCollection);
        alert("product was deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="main_wrapper">
      <Container>
        <div className="admin_form">
          <h3>Add new product:</h3>
          <div className="newProduct">
            <div className="admin_mainInfoWrap">
              <TextField
                label="Name"
                size="small"
                sx={{ m: 1 }}
                type="text"
                name="name"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
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
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
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
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
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
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
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
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    qty: +e.target.value,
                  })
                }
              />
            </div>
            <br />
            <div className="admin_specsWrap">
              {specsArr.map((item, index) => (
                <>
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
                </>
              ))}
              <Button
                variant="outlined"
                sx={{ m: 1 }}
                onClick={() => setSpecsArr([...specsArr, ""])}
              >
                Add product's detail
              </Button>
            </div>
            <br />
            <TextField
              label="Description "
              multiline
              size="large"
              sx={{ m: 1 }}
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
            <br />
            <div className="admin_photosWrap">
              <h4> upload photos:</h4>
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
              <div className="admin_photos">
                {photosArr.map((item, index) => (
                  <div className="admin_photo">
                    <img style={{ width: 200 }} src={item} />
                    <Button
                      variant="outlined"
                      onClick={() => deletePhoto(index)}
                    >
                      Delete Photo
                      <Icons.CiTrash />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <br /> <br />
            <Button
              className="admin_form_submit"
              variant="contained"
              sx={{ m: 1, display: "block", m: "auto" }}
              onClick={addNewProduct}
            >
              Add product to site
            </Button>
          </div>
        </div>
        <div className="admin_products">
          <h3>Products:</h3>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Product Name
                  </TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Gemstone</TableCell>
                  <TableCell>Price ₪</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>QTY</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ textTransform: "capitalize" }}
                  >
                    <TableCell>
                      <img style={{ width: 30 }} src={product.url[0]} />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.gemstone}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.qty}</TableCell>
                    <TableCell>
                      <Link
                        to={"/kris/product/" + product.id}
                        state={{ product }}
                      >
                        <Button variant="outlined">
                          <Icons.CiEdit />
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Icons.CiTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <br />
        </div>
      </Container>
    </div>
  );
};

export default AdminMain;
