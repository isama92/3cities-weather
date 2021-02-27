import { getCities, setCities } from 'shared/helpers/storage';
import * as actionTypes from '../actionTypes';

const storageCities = getCities();

const initialState = {
    cities: storageCities,
    active: storageCities[0] || null,
    geolocation: null,
};

const addCity = (state, action) => {
    const cities = [...state.cities];
    const city = action.city.trim().toLowerCase();

    // remove all elements except the latest 2
    if (cities.length >= 3) cities.splice(0, cities.length - 2);

    cities.push(city.toLowerCase());
    setCities(cities);
    return { ...state, cities };
};

const removeCity = (state, action) => {
    const cities = [...state.cities];
    const city = action.city.trim().toLowerCase();
    const cityIndex = cities.indexOf(city);
    cities.splice(1, cityIndex);
    setCities(cities);
    return { ...state, cities };
};

const setActive = (state, action) => ({ ...state, active: action.city });

const setGeolocation = (state, geolocation) => ({ ...state, geolocation });
const addGeolocation = (state, action) => setGeolocation(state, action.geolocation);
const removeGeolocation = (state) => setGeolocation(state, null);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        case actionTypes.ADD_CITY:
            return addCity(state, action);
        case actionTypes.REMOVE_CITY:
            return removeCity(state, action);
        case actionTypes.SET_ACTIVE:
            return setActive(state, action);
        case actionTypes.GEOLOCATE:
            return addGeolocation(state, action);
        case actionTypes.GEOLOCATION_REMOVE:
            return removeGeolocation(state);
    }
};

export default reducer;
