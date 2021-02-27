import { fromUnixTime } from 'date-fns';
import axios from 'shared/api/axios';
import { getCountryByCity } from 'shared/helpers/geographic';

const weatherByCity = (city) => {
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

export {
    weatherByCity,
};
