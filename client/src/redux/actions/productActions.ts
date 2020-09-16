import Product from '../../types/Product'
import products from '../../products.json'
import { sleep } from '../../utils/helpers'

export interface IGetProductsAction {
  readonly type: 'GET_PRODUCTS'
  payload: Product[]
}
export type ProductActions = IGetProductsAction

export const getProducts = async (filters: any[]): Promise<IGetProductsAction> => {
  await sleep(500)

  let temp = products
  let filteredProducts: Product[] = []

  temp.forEach((item) => {
    console.log('item', item)

    let result = true

    filters.forEach((filter) => {
      console.log('filter', filter)

      let findResult = item.filters.find((itemFilter) => itemFilter.key === filter.key && filter.values.includes(itemFilter.name))
      console.log('findResult', findResult)

      if (!findResult) result = false

      console.log('result', result)
    })

    if (result) {
      filteredProducts.push(item)
    }

    console.log('final result', result)
  })

  return {
    type: 'GET_PRODUCTS',
    payload: filteredProducts,
  }
}
