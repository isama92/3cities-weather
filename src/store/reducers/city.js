import { setCities } from 'shared/helpers/storage';
import * as actionTypes from '../actionTypes';

const initialState = {
    cities: [],
    active: null,
    geolocation: null,
};

const saveCitiesToStorage = (cities) => {
    const storageCities = cities.map((city) => city.id);
    // TODO: remove console.log
    // eslint-disable-next-line no-console
    console.log('city ids for storage:', storageCities);
    setCities(storageCities);
};

const bootstrap = (state, action) => ({ ...state, cities: action.cities, active: action.cities[0] || null });

const addCity = (state, action) => {
    const cities = [...state.cities];
    const { city } = action;

    // remove all elements except the latest 2
    if (cities.length >= 3) cities.splice(0, cities.length - 2);

    cities.push(city);
    saveCitiesToStorage(cities);
    return { ...state, cities };
};

const removeCity = (state, action) => {
    const cities = [...state.cities];
    const { cityIndex } = action;
    cities.splice(1, cityIndex);
    saveCitiesToStorage(cities);
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
        case actionTypes.BOOTSTRAP:
            return bootstrap(state, action);
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
