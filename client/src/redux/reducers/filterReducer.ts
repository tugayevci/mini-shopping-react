import { FilterActions } from '../actions/filterActions'

type IState = {
  filters: any[]
  selectedFilters: any[]
}
const initialState: IState = {
  filters: [],
  selectedFilters: [],
}
const FilterReducer = (state: IState = initialState, action: FilterActions) => {
  switch (action.type) {
    case 'GET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      }
    case 'SET_FILTERS':
      return {
        ...state,
        selectedFilters: action.payload,
      }
    default:
      return state
  }
}
export default FilterReducer
