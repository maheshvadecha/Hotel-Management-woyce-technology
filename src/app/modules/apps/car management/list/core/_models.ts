import {ID,Response} from '../../../../../../_metronic/helpers'
export type CarDataModel = {
  id?: ID
  name?: string
  price?:number
  status?:number
  sic_charge?:number
  pvt_charge?:number
}

export type CarQueryResponse = Response<Array<CarDataModel>>

export const initial: CarDataModel = {
  name: '',
  price:0,
  status:1,
  id: 0,
  sic_charge:0,
  pvt_charge:0,
}