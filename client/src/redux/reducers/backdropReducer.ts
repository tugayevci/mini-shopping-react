import { BackdropStatusActions } from '../actions/backdropActions'

type IState = {
  open: boolean
}
const initialState: IState = {
  open: false,
}
const BackdropReducer = (state: IState = initialState, action: BackdropStatusActions) => {
  console.log('bana gelen action', action)

  switch (action.type) {
    case 'GET_BACKDROP_STATUS':
      return {
        ...state,
        open: action.payload,
      }
    case 'SET_BACKDROP_STATUS':
      return {
        ...state,
        open: action.payload,
      }
    default:
      return state
  }
}
export default BackdropReducer
