import { useEffect, useState } from "react"
import { imgStorage, auth, db, app} from "./firebase"
import { getFirestore, collection, query, where, getDocs, doc } from "firebase/firestore"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { useSelector, useDispatch } from "react-redux"
import ProductThumbnailComp from "./ProductThumbnail"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FilterComp from "./Filter"

function ProductsComp() {

  const storeData = useSelector(state => state)
  const [products, setProducts] = useState(storeData.wholeCollection)

  const filterByType = (value) => {
    if(value == ""){
      setProducts(storeData.wholeCollection)
    }
    else{
      setProducts(storeData.wholeCollection.filter((product) => product.type == value))
    }
  }

  const filterByGemstone = (value) => {
    if(value == ""){
      setProducts(storeData.wholeCollection)
    }
    else{
      setProducts(storeData.wholeCollection.filter((product) => product.gemstone == value))
    }
  }

  const sortProducts = (value) => {
    setProducts(storeData.wholeCollection.sort((a,b) => 
    (value === "lowest" ? ((a.price > b.price) ? 1:-1) : value === "highest" ? ((a.price < b.price) ? 1:-1) : "" )))
  }

    return (
      <div className="App">
        <div className="products">
          <Container>
            <FilterComp 
              filterByType={filterByType}
              filterByGemstone={filterByGemstone}
              sortProducts={sortProducts}/>
          </Container>
          <Container className="products_container">
                {
                  products.map(item =>
                    {
                      return <div key={item.id}>
                          <ProductThumbnailComp key={item.id} product={item}/>
                      </div>
                    })
                }
          </Container>
        </div>
      </div>
    );
}
export default ProductsComp;
