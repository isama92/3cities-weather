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

export const addCity = (city) => (dispatch, getState) => {
    getWeatherByCity(city)
        .then((res) => {
            if (res === null) return;
            const citiesIds = getState().city.cities.map((c) => c.id);
            if (citiesIds.indexOf(city.id) !== -1) return;
            dispatch({
                type: actionTypes.ADD_CITY,
                city: res,
            });
        });
};

export const addActiveCity = () => (dispatch, getState) => {
    const cityState = getState().city;
    const { active, cities } = cityState;
    const citiesIds = cities.map((c) => c.id);
    if (citiesIds.indexOf(active.id) !== -1) return;
    dispatch({
        type: actionTypes.ADD_CITY,
        city: active,
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
