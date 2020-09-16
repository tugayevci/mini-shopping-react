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
    let result = true

    filters.forEach((filter) => {
      if (filter.key !== 'price') {
        let findResult = item.filters.find((itemFilter) => itemFilter.key === filter.key && filter.values.includes(itemFilter.name))

        if (!findResult) result = false
      } else {
        const values: number[] = filter.values
          .map((x: any) => x.split('-'))
          .flat(2)
          .map((price: string) => parseFloat(price))
        const maxValue = Math.max(...values)
        const minValue = Math.min(...values)

        if (item.price > maxValue || item.price < minValue) result = false
      }
    })

    if (result) {
      filteredProducts.push(item)
    }
  })

  return {
    type: 'GET_PRODUCTS',
    payload: filteredProducts,
  }
}
