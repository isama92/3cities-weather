import { fromUnixTime } from 'date-fns';
import axios from 'shared/api/axios';
import { getCountryByCity } from 'shared/helpers/geographic';

const weatherOneCallByCoords = (cityId, cityName, coords) => new Promise((resolve) => {
    if (typeof coords === 'undefined') {
        resolve(null);
    }
    const { lat, lon } = coords;
    axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts`)
        .then((onecall) => {
            const monthly = onecall.daily[0];
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
                monthly: {
                    date: fromUnixTime(monthly.dt),
                    label: monthly.weather[0].main,
                    icon: monthly.weather[0].icon,
                    degrees_avg: monthly.temp.day,
                    degrees_min: monthly.temp.min,
                    degrees_max: monthly.temp.max,
                    humidity: monthly.humidity,
                    uvi: monthly.uvi,
                    dew_point: monthly.dew_point,
                },
            });
        }).catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
            resolve(null);
        });
});

export const getWeatherByCityId = (cityId) => new Promise((resolve) => {
    axios.get(`/weather?id=${cityId}`)
        .then((weather) => {
            weatherOneCallByCoords(weather?.id, weather?.name, weather?.coord)
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
                weatherOneCallByCoords(weather?.id, weather?.name, weather?.coord)
                    .then((oneCall) => resolve(oneCall));
            }).catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
                resolve(null);
            });
    });
};

export const getWeatherByCoords = (lat, lon) => new Promise((resolve) => {
    axios.get(`/weather?lat=${lat}&lon=${lon}`)
        .then((weather) => {
            weatherOneCallByCoords(weather?.id, weather?.name, weather?.coord)
                .then((oneCall) => resolve(oneCall));
        }).catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
            resolve(null);
        });
});
