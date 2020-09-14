import React from 'react'
import { Grid } from '@material-ui/core'
import Header from './components/navbar/Header'
import FilterArea from './components/filter/FilterArea'
import ProductList from './components/products/ProductList'

function App() {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={2}>
          <FilterArea />
        </Grid>
        <Grid item xs={12} sm={8}>
          <ProductList />
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
    </Grid>
  )
}

export default App
