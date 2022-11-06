import axios, { AxiosResponse } from 'axios';
import { ID, Response } from '../../../../../../_metronic/helpers';
import { saveCarToast, updateCarToast } from '../edit-modal/EditModalForm';
import { CarDataModel, CarQueryResponse } from './_models';

const API_URL = process.env.REACT_APP_API_URL;

const getCarList = async (query: any): Promise<CarQueryResponse> => {
	const req = {
		pageSize: 10,
		pageNumber: query.page,
		sortBy: query.sort || 'cts',
		sortOrder: query.order || 'desc',
		search: query.search,
	};
	return axios
		.get(`${API_URL}/getAllcarList.php?`, { params: { ...req } })
		.then((d: AxiosResponse<CarQueryResponse>) => d.data);
};

const getCarById = async (id: ID): Promise<CarDataModel | undefined> => {
	return axios
		.get(`${API_URL}/getCarById.php?id=${id}`)
		.then((response: AxiosResponse<Response<CarDataModel>>) => response.data)
		.then((response: Response<CarDataModel>) => response.data);
};

// const createCarData = async (
// 	data: CarDataModel,
// ): Promise<CarDataModel | undefined> => {
// 	if (data) {
// 		data.status = data.status ? 1 : 0;
// 	}
// 	return axios
// 		.post(`${API_URL}/addCar.php`, data)
// 		.then((response: AxiosResponse<Response<CarDataModel>>) => response.data)
// 		.then((response: Response<CarDataModel>) => response.data);
// };

const createCarData = async (data: CarDataModel) => {
	if (data && data.status) {
		data.status = data.status ? 1 : 0;
	}
	try {
		await axios.post(`${API_URL}/addCar.php`, data).then((response) => {
			console.log(response);
			if (response && response.data && response.data.success) {
				saveCarToast();
				return response.data;
			} else {
				return 'null';
			}
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log('error message : ', error.message);
			return error.message;
		} else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		}
	}
};

// const updateCarData = async (
// 	data: CarDataModel,
// ): Promise<CarDataModel | undefined> => {
// 	if (data) {
// 		data.status = data.status ? 1 : 0;
// 	}
// 	return axios
// 		.put(`${API_URL}/updateCarList.php`, data)
// 		.then((response: AxiosResponse<Response<CarDataModel>>) => response.data)
// 		.then((response: Response<CarDataModel>) => response.data);
// };

const updateCarData = async (data: CarDataModel) => {
	if (data && data.status) {
		data.status = data.status ? 1 : 0;
	}
	try {
		await axios.put(`${API_URL}/updateCarList.php`, data).then((response) => {
			if (response && response.data && response.data.success) {
				updateCarToast();
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
			return 'An unexpected error occuored';
		}
	}
};

const deleteCar = async (id: ID): Promise<void> => {
	return axios.get(`${API_URL}/deleteCar.php?id=${id}`).then(() => {});
};

export { getCarList, getCarById, createCarData, updateCarData, deleteCar };
