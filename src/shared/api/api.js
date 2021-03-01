import { fromUnixTime } from 'date-fns';
import axios from 'shared/api/axios';
import { getCountryByCity } from 'shared/helpers/geographic';

const weatherOneCallByCoords = (cityId, cityName, coords) => {
    const { lat, lon } = coords;
    return new Promise((resolve) => {
        axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts`)
            .then((onecall) => {
                resolve({
                    id: cityId,
                    name: cityName,
                    current: {
                        date: fromUnixTime(onecall.current.dt),
                        degrees: onecall.current.temp,
                        label: onecall.current.weather[0].main,
                        icon: onecall.current.weather[0].icon,
                    },
                    hourly: onecall.hourly.map((h) => ({
                        date: fromUnixTime(h.dt),
                        degrees: h.temp,
                        label: h.weather[0].main,
                        icon: h.weather[0].icon,
                    })),
                    daily: onecall.daily.map((d) => ({
                        date: fromUnixTime(d.dt),
                        degrees: d.temp.day,
                        label: d.weather[0].main,
                        icon: d.weather[0].icon,
                    })),
                });
            }).catch((err) => {
            // eslint-disable-next-line no-console
                console.error(err);
                resolve(null);
            });
    });
};

export const getWeatherByCityId = (cityId) => new Promise((resolve) => {
    axios.get(`/weather?id=${cityId}`)
        .then((weather) => {
            weatherOneCallByCoords(weather.id, weather.name, weather.coord)
                .then((oneCall) => resolve(oneCall));
        }).catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
            resolve(null);
        });
});

export const getWeatherByCity = (cityName) => {
    const countryCode = getCountryByCity(cityName);
    return new Promise((resolve) => {
        axios.get(`/weather?q=${cityName},${countryCode}`)
            .then((weather) => {
                weatherOneCallByCoords(weather.id, weather.name, weather.coord)
                    .then((oneCall) => resolve(oneCall));
            }).catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
                resolve(null);
            });
    });
};
