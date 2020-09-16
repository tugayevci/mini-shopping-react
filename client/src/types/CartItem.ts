import Product from './Product'

export default class CartItem {
  product: Product
  count: number
  id: number
  constructor(x: CartItem) {
    this.product = x.product
    this.count = x.count
    this.id = x.id
  }
}
