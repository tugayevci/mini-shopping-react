export default class Product {
  id: number
  name: string
  price: number
  imageUrl?: string
  details?: string
  filters?: any[]

  constructor(x: Product) {
    this.id = x.id
    this.name = x.name
    this.price = x.price
    this.imageUrl = x.imageUrl
    this.details = x.details
    this.filters = x.filters
  }
}
