import Product from '../../types/Product'
import products from '../../products.json'
import { sleep } from '../../utils/helpers'

export interface IGetProductsAction {
  readonly type: 'GET_PRODUCTS'
  payload: Product[]
}
export type ProductActions = IGetProductsAction

//Ürünleri servisten çektiğimiz fonksiyon
//Normal şartlarda tahminim; gelen filtre değerlerini API ye yollayıp gelen ürünleri geri dönmemiz gerekiyor.
//Ortada bir servis olmadığı için servisin filtreleme yapısını bu fonksiyon içine gömdüm.
export const getProducts = async (filters: any[]): Promise<IGetProductsAction> => {
  await sleep(500)

  let temp = products //Geçici ürün listesi
  let filteredProducts: Product[] = [] //Filtrelenmiş ürün listesi

  //Her ürün için;
  temp.forEach((item) => {
    let result = true //Filtre edilip edilmeyeceğinin sonucu.

    //Serviste gelen her filtre için;
    filters.forEach((filter) => {
      //Fiyat filtresi dışındakiler
      if (filter.key !== 'price') {
        let findResult = item.filters.find((itemFilter) => itemFilter.key === filter.key && filter.values.includes(itemFilter.name))

        if (!findResult) result = false
      } else {
        //Fiyat filtresinde değerleri number[] dizisine çevirir.
        const values: number[] = filter.values
          .map((x: any) => x.split('-'))
          .flat(2)
          .map((price: string) => parseFloat(price))
        const maxValue = Math.max(...values) //Fiyat filtresindeki en büyük değer
        const minValue = Math.min(...values) //Fiyat filtresindeki en küçük değer

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
