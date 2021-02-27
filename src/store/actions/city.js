import { getCities } from 'shared/helpers/storage';
import { getWeatherByCity } from 'shared/api/api';
import * as actionTypes from '../actionTypes';

export const bootstrap = () => (dispatch) => {
    const promises = getCities().map((city) => getWeatherByCity(city));
    Promise.all(promises)
        .then((cities) => {
            dispatch({
                type: actionTypes.BOOTSTRAP,
                cities,
            });
        });
};

export const addCity = (city) => (dispatch) => {
    getWeatherByCity(city)
        .then((res) => {
            dispatch({
                type: actionTypes.ADD_CITY,
                city: res,
            });
        });
};

export const removeCity = (cityIndex) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_CITY,
        cityIndex,
    });
};

export const setActiveByCityName = (city) => (dispatch) => {
    getWeatherByCity(city)
        .then((res) => {
            dispatch({
                type: actionTypes.SET_ACTIVE,
                city: res,
            });
        });
};

export const setActiveByCityIndex = (cityIndex) => (dispatch, getState) => {
    const city = getState().city.cities[cityIndex] || null;
    dispatch({
        type: actionTypes.SET_ACTIVE,
        city,
    });
};

export const addGeolocation = () => (dispatch) => {
    // TODO: geolocation
    dispatch({
        type: actionTypes.GEOLOCATE,
        geolocation: {
            x: 1,
            y: 1,
        },
    });
};

export const removeGeolocation = () => (dispatch) => {
    dispatch({
        type: actionTypes.GEOLOCATION_REMOVE,
    });
};
