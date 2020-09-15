import React from 'react'
import { Grid } from '@material-ui/core'
import Header from './components/navbar/Header'
import ListPage from './containers/ListPage'
import FilterArea from './components/filter/FilterArea'
import ProductList from './components/products/ProductList'
import { Provider } from 'react-redux'
import store from './redux/store/store'

function App() {
  return (
    <Provider store={store}>
      <Grid container direction='column'>
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <ListPage />
        </Grid>
      </Grid>
    </Provider>
  )
}

export default App
