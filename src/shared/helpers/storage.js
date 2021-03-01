const citiesKey = 'cities';

// rome
const defaultCities = [3169070];

export const getCities = () => {
    const json = localStorage.getItem(citiesKey);
    return json !== null ? JSON.parse(json) : defaultCities;
};

export const setCities = (cities) => {
    const json = JSON.stringify(cities);
    localStorage.setItem(citiesKey, json);
};
