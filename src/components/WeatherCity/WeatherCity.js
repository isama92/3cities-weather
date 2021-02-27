import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format as formatDate } from 'date-fns';
import { weatherByCity } from 'shared/api/api';
import Loading from 'components/Loading/Loading';
import WeatherTemperature from 'components/WeatherTemperature/WeatherTemperature';
import classes from './WeatherCity.module.css';

const weatherCity = () => {
    const city = useSelector(state => state.city.active);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherByCity(city)
            .then(res => {
                setWeather(res);
            });
    }, [city]);

    return (
        <div className={classes.Container}>
            {
            weather !== null ? (
                <>
                    <div className={classes.Temperature}>
                        <WeatherTemperature degrees={weather.weather.degrees} icon={weather.weather.icon} />
                    </div>
                    <div className={classes.Text}>
                        <div className={classes.City}>{weather.city}</div>
                        <div className={classes.Date}>{formatDate(weather.date, 'EEEE do, MMMM')}</div>
                        <div className={classes.Weather}>{weather.weather.label}</div>
                    </div>
                    <div className={classes.ImageContainer}>
                        <img src={`${process.env.PUBLIC_URL}/assets/city.png`} alt="City" />
                    </div>
                </>
            ) : (
                <Loading />
            )
        }
        </div>
    );
};

export default weatherCity;
