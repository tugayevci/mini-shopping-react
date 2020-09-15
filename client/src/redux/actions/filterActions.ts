import filters from '../../filters.json'

export interface IGetFiltersAction {
  readonly type: 'GET_FILTERS'
  payload: any[]
}

export interface ISetFiltersAction {
  readonly type: 'SET_FILTERS'
  payload: any[]
}

export type FilterActions = IGetFiltersAction | ISetFiltersAction

export const getFilters = (): IGetFiltersAction => {
  return {
    type: 'GET_FILTERS',
    payload: filters,
  }
}

export const setFilters = (filters: any[]): ISetFiltersAction => {
  return {
    type: 'SET_FILTERS',
    payload: filters,
  }
}
