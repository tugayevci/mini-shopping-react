import { combineReducers } from 'redux'

import productReducer from './productReducer'
import filterReducer from './filterReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
})
export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
