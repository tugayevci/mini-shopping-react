import React from 'react'
import { Grid } from '@material-ui/core'
import Header from './components/navbar/Header'
import ListPage from './containers/ListPage'
import Backdrop from './components/backdrop/Backdrop'
import { Provider } from 'react-redux'
import store from './redux/store/store'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Provider store={store}>
        <Grid container direction='column'>
          <Grid item>
            <Backdrop />
          </Grid>
          <Grid item>
            <Header />
          </Grid>
          <Grid item container>
            <ListPage />
          </Grid>
        </Grid>
      </Provider>
    </div>
  )
}

export default App
