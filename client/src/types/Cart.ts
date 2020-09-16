import CartItem from './CartItem'

export default class Cart {
  cartItems: CartItem[]

  constructor(x: Cart) {
    this.cartItems = x.cartItems
  }
}
