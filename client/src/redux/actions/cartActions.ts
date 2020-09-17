import Cart from '../../types/Cart'
import CartItem from '../../types/CartItem'
import { sleep } from '../../utils/helpers'

export interface IGetCartAction {
  readonly type: 'GET_CART'
  payload: Cart
}

export interface ISetCartAction {
  readonly type: 'SET_CART'
  payload: Cart
}

export interface IAddToCartAction {
  readonly type: 'ADD_TO_CART'
  payload: CartItem
}

export interface IRemoveFromCartAction {
  readonly type: 'REMOVE_FROM_CART'
  payload: number
}

export type CartActions = IGetCartAction | ISetCartAction | IAddToCartAction | IRemoveFromCartAction

export const getCart = (): IGetCartAction => {
  return {
    type: 'GET_CART',
    payload: new Cart({ cartItems: [] }),
  }
}

export const setCart = async (cart: Cart): Promise<ISetCartAction> => {
  await sleep(500)
  return {
    type: 'SET_CART',
    payload: cart,
  }
}

export const addToCart = async (cartItem: CartItem): Promise<IAddToCartAction> => {
  await sleep(500)
  return {
    type: 'ADD_TO_CART',
    payload: cartItem,
  }
}

export const removeFromCart = async (id: number): Promise<IRemoveFromCartAction> => {
  await sleep(500)
  return {
    type: 'REMOVE_FROM_CART',
    payload: id,
  }
}
