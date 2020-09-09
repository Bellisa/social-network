
import { ENV } from "../../const/const"
const API_URL = ENV.API_URL;
const AUTHORIZATIOM = ENV.AUTHORIZATIOM;
class Http {

    constructor() { }

    get(url, isSecurity = true, param) {
        return request(url, 'GET', {}, isSecurity, param);
    }

    post(url, body, isSecurity = true, param) {
        return request(url, 'POST', body, isSecurity, param);
    }

    put(url, body, isSecurity = true, param) {
        return request(url, 'PUT', body, isSecurity, param);
    }

    delete(url, body, isSecurity = true, param) {
        return request(url, 'DELETE', body, isSecurity, param);
    }
    getUrlImage(name) {
        return API_URL + name;
    }


}
const request = (url, method = 'GET', body, isSecurity = true, param) => {

    const fetchOpts = {
        method
    };
    if (method !== 'GET') {
        Object.assign(fetchOpts, { body: JSON.stringify(body) });
    }

    Object.assign(fetchOpts, getOptions(isSecurity));
    let urlParam;
    if (param && Object.keys(param).length > 0) {
        urlParam = new URLSearchParams({
            ...param,
        })
    }
    //const urlFeath = 
    const promise = fetch(`${API_URL}${url}${urlParam ? '?' + urlParam : ''}`, fetchOpts)
        .then(response => response.json())
        .then((data) => {
            if (data.error) {
                return Promise.reject(data.error);
            }
            return Promise.resolve(data);
        });

    return promise;
};

const getOptions = (isSecurity) => {
    let token = localStorage.getItem('token');
    let options = {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: isSecurity ? 'include' : 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (!!token) {
        Object.assign(options.headers, { 'Authorization': AUTHORIZATIOM + token });
    }
    return options;
}

export const http = new Http();