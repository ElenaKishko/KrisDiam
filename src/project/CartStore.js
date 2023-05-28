import { observable, action} from "mobx"

export const CartStore = observable({
    products: [],
    cartItems: [],
    cartCounter: 0,
    subTotalCounter: 0,
    //add product to cart
    addToCart: action((product) => 
    {
        const exist = (CartStore.cartItems.find((x) => x.id === product.id))
        if(!exist){
            CartStore.cartItems.push(product)
        }
        CartStore.cartCounter++
        CartStore.subTotalCounter +=  product.price
        return(CartStore.cartItems,CartStore.cartCounter)
    }),
    //decrease quantity of product in cart
    removeFromCart: action((product) =>
    {
        const exist = (CartStore.cartItems.find((x) => x.id === product.id))
        if(exist){
            if(product.qty == 0){
                CartStore.cartItems = CartStore.cartItems.filter(i => i.id != product.id)
            }
        }
        CartStore.cartCounter--
        CartStore.subTotalCounter -=  product.price
        return(CartStore.cartItems,CartStore.cartCounter)
    }),
    //remove all items of same product from cart
    deleteFromCart: action((product) =>
    {
        CartStore.subTotalCounter -=  product.qty * product.price
        CartStore.cartCounter -= product.qty
        CartStore.cartItems = CartStore.cartItems.filter(i => i.id != product.id )
        return(CartStore.cartItems,CartStore.cartCounter)
    })
})

