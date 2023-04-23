import { observable, action} from "mobx"

export const CartStore = observable({
    cartItems: [],
    cartCounter: 0,
    addToCart: action((product) => 
    {
        CartStore.cartItems.push(product);
        CartStore.cartCounter++;
        return(CartStore.cartItems,CartStore.cartCounter)
    }),
    removeFromCart: action((product) =>
    {
        console.log(CartStore.cartItems);
        CartStore.cartItems.splice(product.id, 1); 
        CartStore.cartCounter--;
      
        return(CartStore.cartItems,CartStore.cartCounter)
    })
})

