import { fromUnixTime } from 'date-fns';
import axios from 'shared/api/axios';
import { getCountryByCity } from 'shared/helpers/geographic';

export const getWeatherByCity = (city) => {
    const countryCode = getCountryByCity(city);
    return new Promise((resolve) => {
        axios.get(`/weather?q=${city},${countryCode}`)
            .then((weather) => {
                const { lat, lon } = weather.coord;
                axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts`)
                    .then((onecall) => {
                        resolve({
                            city: weather.name,
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
            }).catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
                resolve(null);
            });
    });
};
