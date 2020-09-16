import Cart from '../../types/Cart'
import { sleep } from '../../utils/helpers'

export interface IGetCartAction {
  readonly type: 'GET_CART'
  payload: Cart
}

export interface ISetCartAction {
  readonly type: 'SET_CART'
  payload: Cart
}

export type CartActions = IGetCartAction | ISetCartAction

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
