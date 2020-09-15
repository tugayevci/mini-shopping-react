import React, { Dispatch, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import FilterArea from '../components/filter/FilterArea'
import ProductList from '../components/products/ProductList'
import { AppState } from '../redux/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, ProductActions } from '../redux/actions/productActions'

const ListPage = () => {
  const products = useSelector((state: AppState) => state.product.products)
  const selectedFilters = useSelector((state: AppState) => state.filter.selectedFilters)

  console.log('products', products)

  const productDispatch = useDispatch<Dispatch<ProductActions>>()

  useEffect(() => {
    productDispatch(getProducts(selectedFilters))
  }, [productDispatch, selectedFilters])

  return (
    <>
      <Grid item xs={false} sm={1} />
      <Grid item xs={12} sm={2}>
        <FilterArea />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={false} sm={1} />
    </>
  )
}

export default ListPage
