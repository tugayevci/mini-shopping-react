import Cart from '../../types/Cart'
import { CartActions } from '../actions/cartActions'

type IState = {
  cart: Cart
}
const initialState: IState = {
  cart: new Cart({ cartItems: [] }),
}
const CartReducer = (state: IState = initialState, action: CartActions) => {
  console.log('gelen action', action)

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
    case 'ADD_TO_CART':
      return {
        cart: { cartItems: [...state.cart.cartItems, action.payload] },
      }
    case 'REMOVE_FROM_CART':
      return {
        cart: { cartItems: [...state.cart.cartItems.filter((x) => x.id !== action.payload)] },
      }
    default:
      return state
  }
}
export default CartReducer
