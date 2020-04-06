import axios from 'axios';
import { getDefaultNormalizer } from '@testing-library/react';

export const userService = {
    login,
    getUsers
};

function login(email, password) {
    const apiUrl = 'http://localhost:8080/'
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    };
    const dataToSend = { email: email, password: password };
    return axios.post(apiUrl + "login", dataToSend, axiosConfig)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function getUsers() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        let axiosConfig = {
            headers: {
                'x-access-token': user.token
            }
        }
        const apiUrl = 'http://localhost:8080/'
        return axios.get(encodeURI(apiUrl + "users"), axiosConfig)
            .then(handleResponse)
            .then(res => {
                return res;
            });
    }

}

function handleResponse(response) {
    if ((response.status != 201 && response.status != 200) || response.status == 401) { // that is for token identifying that token sucussfully created
        const error = "User Authentication Failed";
        return Promise.reject(error);
    }
    return response.data;
}

