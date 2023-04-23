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
import DropdownExampleSimple from "./tests/example"

function ProductsComp(props) {

  const storeData = useSelector(state => state)
  const [products, setProducts] = useState(storeData.wholeCollection)
  const [type, setType] = useState("")
  const [gemstone, setGemstone] = useState("")
  const [sort, setSort] = useState("")

  const filterByType = (event) => {
    setType(event.target.value)
    if(event.target.value == ""){
      setProducts(storeData.wholeCollection)
      console.log(products)
    }
    else{
      setProducts(storeData.wholeCollection.filter((product) => product.type == event.target.value))
      console.log(products)
    }
  }

  const filterByGemstone = (event) => {
    setGemstone(event.target.value)
    if(event.target.value == ""){
      setProducts(storeData.wholeCollection)
      console.log(products)
    }
    else{
      setProducts(storeData.wholeCollection.filter((product) => product.gemstone == event.target.value))
      console.log(products)
    }
  }

  const sortProducts = (event) => {
    console.log(event.target.value)
    setSort(event.target.value)

    setProducts(products.sort((a,b) => (
      sort === "lowest"?
      ((a.price < b.price) ? 1:-1):
      sort === "highest"?
      ((a.price > b.price) ? 1:-1):
      sort === "newest"? 
      ((a.id > b.id) ? 1:-1):
      ((a.id < b.id) ? 1:-1)
    )))

  }

    return (
      <div className="App">
        <div className="products">
          <Container>
            <FilterComp type={type}
              gemstone={gemstone}
              sort={sort}
              filterByType={filterByType}
              filterByGemstone={filterByGemstone}
              sortProducts={sortProducts}/>
            <DropdownExampleSimple  type={type}
              gemstone={gemstone}
              sort={sort}
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
