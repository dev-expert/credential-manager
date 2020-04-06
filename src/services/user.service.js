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
            return user;
        });
}

function handleResponse(response) {
    if ((response.status != 201 && response.status != 200) || response.status == 401) { // that is for token identifying that token sucussfully created
        const error = "User Authentication Failed";
        return Promise.reject(error);
    }
    return response.data;
}

function getUsers() {
    debugger;
    // const url = 'http://localhost:3000/v1/'
    // return axios.get(url + `customer/breakdownOfAssignment`)
    // .then(res => {
    //     return res.data;
    // });

}
