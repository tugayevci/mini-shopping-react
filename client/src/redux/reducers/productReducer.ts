import Product from '../../types/Product'
import { ProductActions } from '../actions/productActions'

type IState = {
  products: Product[]
}
const initialState: IState = {
  products: [],
}
const ProductReducer = (state: IState = initialState, action: ProductActions) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state
  }
}
export default ProductReducer
