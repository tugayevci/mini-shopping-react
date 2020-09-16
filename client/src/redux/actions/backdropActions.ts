export interface IGetBackdropStatusAction {
  readonly type: 'GET_BACKDROP_STATUS'
  payload: boolean
}

export interface ISetBackdropStatusAction {
  readonly type: 'SET_BACKDROP_STATUS'
  payload: boolean
}

export type BackdropStatusActions = IGetBackdropStatusAction | ISetBackdropStatusAction

export const getBackdropStatus = (): IGetBackdropStatusAction => {
  return {
    type: 'GET_BACKDROP_STATUS',
    payload: false,
  }
}

export const setBackdropStatus = (status: boolean): ISetBackdropStatusAction => {
  return {
    type: 'SET_BACKDROP_STATUS',
    payload: status,
  }
}
