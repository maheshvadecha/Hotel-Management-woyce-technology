import { ID, Response } from '../../../../../../_metronic/helpers';
export type HotelDataModel = {
	id?: ID;
	state_id?: number;
	hotel_name?: string;
	hotel_image:string
	roomtype:number[];
	meal:[{}];
	price?: number;
	star?: number;
	status?: number;
	pickup_price?: number;
	drop_price?: number;
	adult_with_mattress?: number;
	child_with_mattress?: number;
};

export type HotelQueryResponce = Response<Array<HotelDataModel>>;

export const initial: HotelDataModel = {
	id: 0,
	state_id: 0,
	hotel_name: ' ',
	hotel_image:' ',
	roomtype: [],
	meal:[{name:'', price:0}],
	price: 0,
	star: 2,
	status: 0,
	pickup_price: 0,
	drop_price: 0,
	adult_with_mattress: 0,
	child_with_mattress: 0,
};
