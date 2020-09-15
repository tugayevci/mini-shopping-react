import Product from '../../types/Product'
import { CartActions } from '../actions/cartActions'

type IState = {
  cart: Product[]
}
const initialState: IState = {
  cart: [],
}
const CartReducer = (state: IState = initialState, action: CartActions) => {
  switch (action.type) {
    case 'GET_CART':
      return {
        ...state,
        cart: action.payload,
      }
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
      }
    default:
      return state
  }
}
export default CartReducer
