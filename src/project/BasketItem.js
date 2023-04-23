import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap-grid.css'
import { action } from "mobx"
import { CartStore } from './CartStore'

function BasketItemComp(props) {
  const storeData = useSelector(state => state)
  const product = storeData.wholeCollection.find((item) => item.id === props.product.id)
  return (
    <div className="App">
      <section className="basket_item">
        <Link to={"/product/" + product.id}  state={{product}} className="basket_item_img"><img src={product.url} alt={product.name}/></Link>
        <div className="basket_item_info">
          <div className="basket_item_info_title">{product.name}</div>
          <div className="basket_item_info_price">{product.price}</div>
          <div className="basket_item_info_descr">Set is made from pink ruby stone and silver</div>
        </div>
        <div className='basket_item_remove'><button onClick={action(() => {CartStore.removeFromCart(product)})}>X</button></div>
      </section>
    </div>
  );
}
export default BasketItemComp;
