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
import { observer } from "mobx-react"
import { FilterStore } from './FilterStore'

const ProductsComp = observer(() => {
  const storeData = useSelector(state => state)
  const [products, setProducts] = useState([])
  const [overlay, setOverlay] = useState(false)
  
  //load products from redux
  useEffect(() => {
    setProducts(storeData.wholeCollection)
  }, [storeData.wholeCollection])

  const filterAndSort = () => {
    let category = FilterStore.category
    let gemstone = FilterStore.gemstone
    let sort = FilterStore.sort

   //filter and sort products
   if(category == "category" && gemstone == "gemstone" && sort == "sort")
   {
    setProducts(storeData.wholeCollection)
   }
   else if(category != "category" && gemstone == "gemstone" && sort == "sort")
   {
    let p = storeData.wholeCollection.filter((product) => product.type == category)
    setProducts(p)
   }
   else if(category != "category" && gemstone != "gemstone" && sort == "sort")
   {
    let p = storeData.wholeCollection.filter((product) => product.type == category)
    let pr = p.filter((product) => product.gemstone == gemstone)
    setProducts(pr)
   }
   else if(category == "category" && gemstone != "gemstone" && sort == "sort")
   {
    let p = storeData.wholeCollection.filter((product) => product.gemstone == gemstone)
    setProducts(p)
   }
   else if(category == "category" && gemstone != "gemstone" && sort != "sort")
   {
    let p = storeData.wholeCollection.filter((product) => product.gemstone == gemstone)
    let pr = [...p].sort((a,b) => 
    (sort === "lowest" ? ((a.price > b.price) ? 1:-1) : sort === "highest" ? ((a.price < b.price) ? 1:-1) : "" ))
    setProducts(pr)
   }
   else if(category == "category" && gemstone == "gemstone" && sort != "sort")
   {
    let p = [...storeData.wholeCollection].sort((a,b) => 
    (sort === "lowest" ? ((a.price > b.price) ? 1:-1) : sort === "highest" ? ((a.price < b.price) ? 1:-1) : "" ))
    setProducts(p)
   }
   else if(category != "category" && gemstone == "gemstone" && sort != "sort")
   {
    let p = storeData.wholeCollection.filter((product) => product.type == category)
    let pr = [...p].sort((a,b) => 
    (sort === "lowest" ? ((a.price > b.price) ? 1:-1) : sort === "highest" ? ((a.price < b.price) ? 1:-1) : "" ))
    setProducts(pr)
   }
   else
   {
    let p = storeData.wholeCollection.filter((product) => product.type == category)
    let pr = p.filter((product) => product.gemstone == gemstone)
    let pro = [...pr].sort((a,b) => 
    (sort === "lowest" ? ((a.price > b.price) ? 1:-1) : sort === "highest" ? ((a.price < b.price) ? 1:-1) : "" ))
    setProducts(pro)
   }
  }

    return (
      <>
      <div className={overlay ? "overlay" : ""}></div>
      <div className="products">
        <Container className='container-xxl container-xl container-lg container-md container-sm'>
          <FilterComp 
            filterAndSort={filterAndSort} setOverlay={setOverlay}
            />
        </Container>
        <Container className="products_container container-xxl container-xl container-lg container-md container-sm">
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
      </>
    );
})

export default ProductsComp;
