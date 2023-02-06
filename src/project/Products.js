import { useEffect, useState } from "react"
import { storage } from "./firebase.js"
import { ref, uploadBytes, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js"
import {v4} from 'uuid'

import FooterComp from "./Footer"
import HeaderComp from "./Header"

function ProductsComp(props) {

  const [imageUpload, setImageUpload] = useState(null)

  const uploadImage = () => {
    if(imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    })
  }

  const[imageList, setImageList] = useState([])
  const imageListRef = ref(storage, "images/")

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url])
        })
      })
    })
  },[])

  return (
    <div className="App">
      <div className="main_wrapper">
        <HeaderComp/>
        <div className="test2">
          <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
          <button onClick={uploadImage}>Upload image</button>
        </div>
        {imageList.map((url) => {
          return <div>
                  <img className="test" src={url}/>
                </div>
        })}
        <FooterComp/>
      </div>
    </div>
  );
}
export default ProductsComp;
