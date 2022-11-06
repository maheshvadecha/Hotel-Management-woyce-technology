import axios, { AxiosResponse } from 'axios';
import { Response } from '../../../../../../_metronic/helpers';
import { saveStateToast, updateStateToast } from '../edit-modal/EditModalForm';
import { StateDataModel, StateQueryResponce } from './_models';

const API_URL = process.env.REACT_APP_API_URL;

const getStateList = async (query: any): Promise<StateQueryResponce> => {
	const req = {
		pageSize: 10,
		pageNumber: query.page,
		sortBy: query.sort || 'cts',
		sortOrder: query.order || 'desc',
		search: query.search,
	};
	return axios
		.get(`${API_URL}/getState.php?`, { params: { ...req } })
		.then((d: AxiosResponse<StateQueryResponce>) => d.data);
};

const getStateById = async (id: any): Promise<StateDataModel | undefined> => {
	return axios
		.get(`${API_URL}/getStateById.php?id=${id.id}`)
		.then((response: AxiosResponse<Response<StateDataModel>>) => response.data)
		.then((response: Response<StateDataModel>) => response.data);
};

// const createStateData = async (data: StateDataModel) => {
// 	if (data) {
// 		data.status = data.status ? 1 : 0;
// 	}
// 	 await axios
// 		.post(`${API_URL}/addState.php`, data)
// 		.then((response: AxiosResponse<Response<StateDataModel>>) => response.data)
// 		.then((response: Response<StateDataModel>) =>{
// 			console.log(response)
// 		});
// };

const createStateData = async (data: StateDataModel) => {
	if (data && data.status) {
		data.status = data.status ? 1 : 0;
	}
	try {
		await axios.post(`${API_URL}/addState.php`, data).then((response) => {
			if (response && response.data && response.data.success) {
				saveStateToast();
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
			return 'An unexpected error occurred';
		}
	}
};

// const updateStateData = async (
// 	data: StateDataModel,
// ): Promise<StateDataModel | undefined> => {
// 	if (data) {
// 		data.status = data.status ? 1 : 0;
// 	}
// 	return axios
// 		.put(`${API_URL}/updateState.php`, data)
// 		.then((response: AxiosResponse<Response<StateDataModel>>) => response.data)
// 		.then((response: Response<StateDataModel>) => response.data);
// };

const updateStateData = async (data: StateDataModel) => {
	if (data && data.status) {
		data.status = data.status ? 1 : 0;
	}
	try {
		await axios.put(`${API_URL}/updateState.php`, data).then((response) => {
			console.log(response);
			if (response && response.data && response.data.success) {
				updateStateToast();
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
			return 'An unexpected error occurred';
		}
	}
};

const deleteState = async (id: any): Promise<void> => {
	return axios.get(`${API_URL}/deleteState.php?id=${id.id}`).then(() => {});
};

const getAllState = async (): Promise<any> => {
	return axios
		.get(`${API_URL}/publicGetallState.php`)
		.then((responce: AxiosResponse<Response<any>>) => responce.data)
		.then((responce: Response<any>) => responce.data);
};

export {
	getStateList,
	getStateById,
	createStateData,
	updateStateData,
	deleteState,
	getAllState,
};
