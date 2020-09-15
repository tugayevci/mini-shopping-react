import Product from '../../types/Product'

export interface IGetCartAction {
  readonly type: 'GET_CART'
  payload: Product[]
}

export interface ISetCartAction {
  readonly type: 'SET_CART'
  payload: any[]
}

export type CartActions = IGetCartAction | ISetCartAction

export const getCart = (): IGetCartAction => {
  return {
    type: 'GET_CART',
    payload: [],
  }
}

export const setCart = (filters: any[]): ISetCartAction => {
  return {
    type: 'SET_CART',
    payload: filters,
  }
}
