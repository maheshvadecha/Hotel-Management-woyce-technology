import axios, { AxiosResponse } from 'axios';
import { ID, Response } from '../../../../../../_metronic/helpers';
import { saveCityToast, updateCityToast } from '../edit-modal/EditModalForm';
import { CityDataModel, CityQueryResponce } from './_models';

const API_URL = process.env.REACT_APP_API_URL;

const getCityList = async (query: any): Promise<CityQueryResponce> => {
	const req = {
		pageSize: 10,
		pageNumber: query.page,
		sortBy: query.sort || 'cts',
		sortOrder: query.order || 'desc',
		search: query.search,
	};
	return axios
		.get(`${API_URL}/getCity.php?`, { params: { ...req } })
		.then((d: AxiosResponse<CityQueryResponce>) => d.data);
};

const getCityById = async (id: any): Promise<CityDataModel | undefined> => {
	return axios
		.get(`${API_URL}/getCityById.php?id=${id.id}`)
		.then((response: AxiosResponse<Response<CityDataModel>>) => response.data)
		.then((response: Response<CityDataModel>) => response.data);
};

// const createCityData = async (
// 	data: CityDataModel,
// ): Promise<CityDataModel | undefined> => {
// 	if (data) {
// 		data.status = data.status ? 1 : 0;
// 	}
// 	return axios
// 		.post(`${API_URL}/addCity.php`, data)
// 		.then((response: AxiosResponse<Response<CityDataModel>>) => response.data)
// 		.then((response: Response<CityDataModel>) => response.data);
// };

const createCityData = async (data: CityDataModel) => {
	if (data && data.status) {
		data.status = data.status ? 1 : 0;
	}
	try {
		await axios.post(`${API_URL}/addCity.php`, data).then((response) => {
			if (response && response.data && response.data.success) {
				saveCityToast();
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
			return 'An unexpected error occuorred.';
		}
	}
};

// const updateCityData = async (
// 	data: CityDataModel,
// ): Promise<CityDataModel | undefined> => {
// 	if (data) {
// 		data.status = data.status ? 1 : 0;
// 	}
// 	return axios
// 		.put(`${API_URL}/updateCity.php`, data)
// 		.then((response: AxiosResponse<Response<CityDataModel>>) => response.data)
// 		.then((response: Response<CityDataModel>) => response.data);
// };

const updateCityData = async (data: CityDataModel) => {
	if (data && data.status) {
		data.status = data.status ? 1 : 0;
	}
	try {
		await axios.put(`${API_URL}/updateCity.php`, data).then((response) => {
			console.log(response);
			if (response && response.data && response.data.success) {
				updateCityToast();
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
			return 'An unexpected error occuorred.';
		}
	}
};

const deleteCity = async (id: any): Promise<void> => {
	return axios.get(`${API_URL}/deleteCity.php?id=${id.id}`).then(() => {});
};

const getAllState = async (): Promise<any> => {
	return axios
		.get(`${API_URL}/publicGetallState.php`)
		.then((responce: AxiosResponse<Response<any>>) => responce.data)
		.then((responce: Response<any>) => responce.data);
};

export {
	getCityList,
	getCityById,
	createCityData,
	updateCityData,
	deleteCity,
	getAllState,
};
