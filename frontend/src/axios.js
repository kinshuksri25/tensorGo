import axios from 'axios';

const baseUrl = document.location.origin;

export const axiosGET = (url, header, config) => new Promise((resolve, reject) => {

    let getUrl = baseUrl + url;
    let configObejct = {
        headers: {...header },
        ...config
    }
    axios.get(getUrl, configObejct)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        });
});

export const axiosPUT = (url, data, header, config) => new Promise((resolve, reject) => {

    let putUrl = baseUrl + url;
    let configObejct = {
        headers: {...header },
        ...config
    }
    axios.put(putUrl, data, configObejct)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        });
});