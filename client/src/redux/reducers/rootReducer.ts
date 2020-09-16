import { combineReducers } from 'redux'

import productReducer from './productReducer'
import filterReducer from './filterReducer'
import cartReducer from './cartReducer'
import backdropReducer from './backdropReducer'

const rootReducer = combineReducers({
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  backdrop: backdropReducer,
})
export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
