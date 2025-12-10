// lib/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: "https://station.technolanes.com/station/api/v1",
	headers: {
		Accept: "*/*",
		"Content-Type": "application/json",
	},
});
export const publicAxiosInstance = axios.create({
	baseURL: "https://station.technolanes.com/station/api/v1",
	headers: {
		Accept: "*/*",
		"Content-Type": "application/json",
	},
});
axiosInstance.interceptors.request.use(function (config) {
	const token = Cookies.get("auth_token");
	config.headers.Authorization = `Bearer ${token}`;

	return config;
});
export default axiosInstance;
