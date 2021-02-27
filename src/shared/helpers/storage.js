const citiesKey = 'cities';

const defaultCities = ['rome', 'london'];

export const getCities = () => {
    const json = localStorage.getItem(citiesKey);
    return json !== null ? JSON.parse(json) : defaultCities;
};

export const setCities = (cities) => {
    const json = JSON.stringify(cities);
    localStorage.setItem(citiesKey, json);
};
