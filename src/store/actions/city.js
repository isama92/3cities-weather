import { getCities, getGeolocation } from 'shared/helpers/storage';
import { getWeatherByCityId, getWeatherByCityName, getWeatherByCoords } from 'shared/api/api';
import * as actionTypes from '../actionTypes';

const dispatchBootstrap = (dispatch, cities, geolocation = null) => {
    dispatch({
        type: actionTypes.BOOTSTRAP,
        cities,
        geolocation,
    });
};

export const bootstrap = () => (dispatch) => {
    const geolocationCityId = getGeolocation();
    const promises = getCities().map((cityId) => getWeatherByCityId(cityId));
    Promise.all(promises)
        .then((cities) => {
            const filteredCities = cities.filter((c) => c !== null);
            if (geolocationCityId !== null) {
                getWeatherByCityId(geolocationCityId)
                    .then((geolocation) => {
                        dispatchBootstrap(dispatch, filteredCities, geolocation);
                    });
            } else {
                dispatchBootstrap(dispatch, filteredCities);
            }
        });
};

export const addCity = (city) => (dispatch, getState) => {
    getWeatherByCityName(city)
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
    if (active === null) return;
    const citiesIds = cities.map((c) => c.id);
    if (citiesIds.indexOf(active.id) !== -1) return;
    dispatch({
        type: actionTypes.ADD_CITY,
        city: active,
    });
};

export const removeCity = (cityId) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_CITY,
        cityId,
    });
};

export const setActiveByCityName = (city) => (dispatch) => {
    dispatch({
        type: actionTypes.SEARCHING,
    });
    getWeatherByCityName(city)
        .then((res) => {
            dispatch({
                type: actionTypes.SET_ACTIVE,
                city: res,
            });
        });
};

export const setActiveByCityId = (cityId) => (dispatch, getState) => {
    const city = getState().city.cities.find((c) => c.id === cityId);
    if (typeof city === 'undefined') return;
    dispatch({
        type: actionTypes.SET_ACTIVE,
        city,
    });
};

export const setGeolocationAsActive = () => (dispatch, getState) => {
    const city = getState().city.geolocation;
    if (city === null) return;
    dispatch({
        type: actionTypes.SET_ACTIVE,
        city,
    });
};

export const addGeolocation = () => (dispatch) => {
    dispatch({
        type: actionTypes.GEOLOCATING,
    });
    navigator.geolocation.getCurrentPosition((position) => {
        getWeatherByCoords(position.coords.latitude, position.coords.longitude)
            .then((res) => {
                dispatch({
                    type: actionTypes.GEOLOCATE,
                    geolocation: res,
                });
            });
    }, (err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        alert('geolocation failed');
    }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
    });
};

export const removeGeolocation = () => (dispatch) => {
    dispatch({
        type: actionTypes.GEOLOCATION_REMOVE,
    });
};
