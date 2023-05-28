import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap-grid.css'
import { action } from "mobx"
import { CartStore } from './CartStore'
import { useDispatch } from "react-redux"

function BasketItemComp(props) {
  const storeData = useSelector(state => state)
  const dispatch = useDispatch()
  const product = storeData.wholeCollection.find((item) => item.id === props.product.id)

  return (
    <div className="App">
      <section className="basket_item">
        <Link to={"/product/" + product.id}  state={{product}} className="basket_item_img"><img src={product.url} alt={product.name}/></Link>
        <div className="basket_item_info">
          <div className="basket_item_info_title">{product.name}</div>
          <div className="basket_item_info_price">{product.price} nis</div>
          <div className="basket_item_info_descr">Set is made from pink ruby stone and silver</div>
          <div className="basket_item_info_qty">
            <div className="basket_item_info_qty_title">Quantity:</div>
            <div className="basket_item_info_qty_btn">
              <button onClick={action(() =>{
                              {dispatch({type:"DECREASEQTY", payload: product})}
                              {CartStore.removeFromCart(product)}
                              })}> - </button>
              <div className="basket_item_info_qty_count">{product.qty}</div>
              <button onClick={action(() =>{
                              {dispatch({type:"INCREASEQTY", payload: product})}
                              {CartStore.addToCart(product)}
                              })}> + </button>
            </div>
          </div>
        </div>
        <div className='basket_item_remove'><button onClick={action(() => {CartStore.deleteFromCart(product)})}>X</button></div>
      </section>
    </div>
  );
}
export default BasketItemComp;
