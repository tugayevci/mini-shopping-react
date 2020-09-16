import Cart from '../../types/Cart'
import { CartActions } from '../actions/cartActions'

type IState = {
  cart: Cart
}
const initialState: IState = {
  cart: new Cart({ cartItems: [] }),
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
