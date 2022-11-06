import axios, { AxiosResponse } from 'axios';
import { Response } from '../../../../../../_metronic/helpers';
import { saveHotelToast, updateHotelToast } from '../edit-modal/EditModalForm';
import { HotelDataModel, HotelQueryResponce } from './_models';
const API_URL = process.env.REACT_APP_API_URL;

const getHotelList = async (query: any): Promise<HotelQueryResponce> => {
	const req = {
		pageSize: 10,
		pageNumber: query.page,
		sortBy: query.sort || 'cts',
		sortOrder: query.order || 'desc',
		search: query.search,
	};
	return axios
		.get(`${API_URL}/getHotel.php?`, { params: { ...req } })
		.then((d: AxiosResponse<HotelQueryResponce>) => d.data);
};

const getHotelById = async (id: any): Promise<HotelDataModel | undefined> => {
	return axios
		.get(`${API_URL}/getHotelById.php?id=${id.id}`)
		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)
		.then((response: Response<HotelDataModel>) => response.data);
};

// const createHotelData = async (
// 	data: any,
// ): Promise<HotelDataModel | undefined> => {
// 	if (data) {
// 		data.status = data.status ? 1 : 0;
// 	}
// 	return axios
// 		.post(`${API_URL}/addHotel.php`, data)
// 		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)
// 		.then((response: Response<HotelDataModel>) => response.data);
// };

const createHotelData = async (data: any) => {
	if (data && data.status) {
		data.status = data.status ? 1 : 0;
	}
	try {
		await axios.post(`${API_URL}/addHotel.php`, data).then((response) => {
			if (response && response.data && response.data.success) {
				saveHotelToast();
				return response.data;
			} else {
				return null;
			}
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('error message : ', error.message);
			return error.message;
		} else {
			console.log('unexpected error', error);
			return 'An unexpected error occourred';
		}
	}
};

// const updateHotelData = async (
// 	data: any,
// ): Promise<HotelDataModel | undefined> => {
// 	if (data) {
// 		data.status = data.status ? 1 : 0;
// 	}
// 	return axios
// 		.put(`${API_URL}/updateHotel.php`, data)
// 		.then((response: AxiosResponse<Response<HotelDataModel>>) => response.data)
// 		.then((response: Response<HotelDataModel>) => response.data);
// };

const updateHotelData = async (data: any) => {
	if (data && data.status) {
		data.status = data.status ? 1 : 0;
	}
	try {
		await axios.post(`${API_URL}/updateHotel.php`, data).then((response) => {
			if (response && response.data && response.data.success) {
				updateHotelToast();
				return response.data;
			} else {
				return null;
			}
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('error message : ', error.message);
			return error.message;
		} else {
			console.log('unexpected error : ', error);
			return 'An unexpected error ouccourred';
		}
	}
};

const deleteHotel = async (id: any): Promise<void> => {
	return axios.get(`${API_URL}/deleteHotel.php?id=${id.id}`).then(() => {});
};

const getAllState = async (): Promise<any> => {
	return axios
		.get(`${API_URL}/publicGetallState.php`)
		.then((responce: AxiosResponse<Response<any>>) => responce.data)
		.then((responce: Response<any>) => responce.data);
};

const getRoomType = async () => {
	try {
		return await axios
			.get(`${API_URL}/getRoomType.php`)
			.then((responce: AxiosResponse<Response<any>>) => responce.data)
			.then((responce: Response<any>) => {
				if (responce && responce.status === true) {
					return responce.data;
				} else {
					return null;
				}
			});
	} catch (error) {
		console.log(error);
	}
};

export {
	getHotelList,
	getHotelById,
	createHotelData,
	updateHotelData,
	deleteHotel,
	getAllState,
	getRoomType,
};
