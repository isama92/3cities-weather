import { fromUnixTime } from 'date-fns';
import axios from 'shared/api/axios';
import { getCountryByCity } from 'shared/helpers/geographic';

export const weatherByCity = (city) => {
    const countryCode = getCountryByCity(city);
    return new Promise((resolve) => {
        axios.get(`/weather?q=${city},${countryCode}`)
            .then(res => {
                resolve({
                    city: res.name,
                    date: fromUnixTime(res.dt),
                    weather: {
                        label: res.weather[0].main,
                        icon: res.weather[0].icon,
                        degrees: res.main.temp,
                    },
                });
            }).catch(err => {
                // eslint-disable-next-line no-console
                console.error(err);
                resolve(null);
            });
    });
};

export const forecastByCity = (city) => {
    const countryCode = getCountryByCity(city);
    return new Promise((resolve) => {
        axios.get(`/forecast?q=${city},${countryCode}`)
            .then(res => {
                const mappedRes = res.list.map(r => ({
                    date: fromUnixTime(r.dt),
                    weather: {
                        label: r.weather[0].main,
                        icon: r.weather[0].icon,
                        degrees: r.main.temp,
                    },
                }));
                resolve(mappedRes);
            }).catch(err => {
            // eslint-disable-next-line no-console
                console.error(err);
                resolve(null);
            });
    });
};
