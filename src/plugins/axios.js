import axios from "axios";
import token from "@/utils/token";
import { useAppStore } from "@/store/app";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

axios.interceptors.request.use(function (config) {
    let apiToken = token.get();
    if (apiToken) {
        config.headers.Authorization = apiToken;
    }
    return config;
});

/**
 * Call .then() and .catch() and .then()
 * 
 * @param {Object} config 
 * @returns {Promise}
 */
const req = async (config = {
    action: null,
    method: 'get',
    data: null,
    success: null,
    fail: null,
    finally: null
}) => {
    return axios.request({
        url: config?.action,
        method: config?.method,
        data: config?.data
    }).then((response) => {
        if (config?.success) {
            config.success(response);
        }
    }).catch((response) => {
        useAppStore().addAlert().error(response.response.data.error, response.response.data.error);

        if (config?.fail) {
            config.fail(response);
        }
    }).then(() => {
        if (config?.finally) {
            config.finally();
        }
    })
}

/**
 * Return a axios.request instance
 * 
 * @param {Object} config 
 * @returns {Promise}
 */
const request = async (config = {
    action: null,
    method: 'get',
    data: null
}) => {
    return axios.request({
        url: config?.action,
        method: config?.method,
        data: config?.data
    });
};

export { req, request };