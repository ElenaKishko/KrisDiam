import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductThumbnailComp from "./ProductThumbnail"
import Container from 'react-bootstrap/Container'
import FilterComp from "./Filter"
import { useParams } from "react-router-dom"
import { observer } from "mobx-react"
import { FilterStore } from './FilterStore'

const ProductsByCategoryComp = observer(() =>  {

  const storeData = useSelector(state => state)
  const [products, setProducts] = useState([])
  const params = useParams()
  let category = params.category

  useEffect(() =>
  {
    async function getProducts()
    {
      let resp = await storeData.wholeCollection.filter((product) => product.type == category)
      setProducts(resp)
    }
    getProducts()
  },[category])

  const filterAndSort = () => {
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
      <div className="App">
        <div className="products">
          <Container>
            <FilterComp 
              filterAndSort={filterAndSort}
              category={params.category}/>
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
})
export default ProductsByCategoryComp;
