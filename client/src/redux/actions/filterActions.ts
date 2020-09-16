import filters from '../../filters.json'
import { sleep } from '../../utils/helpers'

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

export const setFilters = async (filters: any[]): Promise<ISetFiltersAction> => {
  await sleep(500)
  return {
    type: 'SET_FILTERS',
    payload: filters,
  }
}
