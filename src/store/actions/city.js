import * as actionTypes from '../actionTypes';

export const addCity = (city) => (dispatch) => {
    dispatch({
        type: actionTypes.ADD_CITY,
        city,
    });
};

export const removeCity = (city) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_CITY,
        city,
    });
};

export const setActiveCity = (city) => (dispatch) => {
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
