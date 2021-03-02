import { setCities, setGeolocation as setGeolocationToStorage } from 'shared/helpers/storage';
import * as actionTypes from '../actionTypes';

const initialState = {
    cities: [],
    active: null,
    geolocation: null,
    searching: false,
};

const saveCitiesToStorage = (cities) => {
    const storageCities = cities.map((city) => city.id);
    setCities(storageCities);
};

const bootstrap = (state, action) => ({
    ...state,
    cities: action.cities,
    geolocation: action.geolocation,
    active: action.cities[0] || null,
});

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
    const { cityId } = action;
    const cityIndex = cities.findIndex((c) => c.id === cityId);
    cities.splice(cityIndex, 1);
    saveCitiesToStorage(cities);
    return { ...state, cities };
};

const setActive = (state, action) => ({ ...state, active: action.city, searching: false });

const setGeolocation = (state, geolocation) => {
    setGeolocationToStorage(geolocation?.id || null);
    return { ...state, geolocation };
};
const addGeolocation = (state, action) => setGeolocation(state, action.geolocation);
const removeGeolocation = (state) => setGeolocation(state, null);

const searching = (state) => ({ ...state, searching: true });

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
        case actionTypes.SEARCHING:
            return searching(state);
    }
};

export default reducer;
