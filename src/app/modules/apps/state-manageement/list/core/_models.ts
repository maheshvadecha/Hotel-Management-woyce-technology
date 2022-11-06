import {ID, Response} from '../../../../../../_metronic/helpers'

export type StateDataModel ={
  id?:ID
  state?:string
  status?:number
}

export type StateQueryResponce = Response<Array<StateDataModel>>

export const initial: StateDataModel = {
  id:0,
  state:'',
  status:1,
}