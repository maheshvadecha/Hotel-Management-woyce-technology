import {ID, Response} from '../../../../../../_metronic/helpers'

export type CityDataModel ={
  id?:ID
  state_id:ID
  city:string
  status?:number
}

export type CityQueryResponce = Response<Array<CityDataModel>>

export const initial: CityDataModel = {
  id:0,
  state_id:0,
  city:'',
  status:1,
}