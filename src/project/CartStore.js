import { observable, action} from "mobx"

export const CartStore = observable({
    products: [],
    cartItems: [],
    cartCounter: 0,
    subTotalCounter: 0,
    addToCart: action((product) => 
    {
        CartStore.cartItems.push(product)
        CartStore.cartCounter++
        CartStore.subTotalCounter +=  product.price
        return(CartStore.cartItems,CartStore.cartCounter)
    }),
    removeFromCart: action((product) =>
    {
        CartStore.cartItems = CartStore.cartItems.filter(i => i.id != product.id)
        CartStore.cartCounter--
        CartStore.subTotalCounter -=  product.price
        return(CartStore.cartItems,CartStore.cartCounter)
    })
})

