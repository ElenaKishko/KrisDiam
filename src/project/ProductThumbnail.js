import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap-grid.css'
import { action } from "mobx"
import { CartStore } from './CartStore'

function ProductThumbnailComp(props) {
    const storeData = useSelector(state => state)
    const {product} = props
    return (
      <div className="App">
          <div className='thumbnail_bg'>
            <Link to={"/product/" + product.id} state={{product}}><img className='thumbnail_img' src={product.url}/></Link>   
            <div className="thumbnail_descr">
              <div className="thumbnail_descr_name">{product.name}</div>
              <div className="thumbnail_descr_price">{product.price} nis</div>

            </div> 
            <button className="product_info_btn" onClick={action(() => {CartStore.addToCart(product)})}>Add To Cart</button>
          </div>
      </div>
    );
}
export default ProductThumbnailComp;