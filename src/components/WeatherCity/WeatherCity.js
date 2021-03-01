import React from 'react';
import { useSelector } from 'react-redux';
import { format as formatDate } from 'date-fns';
import Loading from 'components/Loading/Loading';
import WeatherTemperature from 'components/WeatherTemperature/WeatherTemperature';
import classes from './WeatherCity.module.css';

const weatherCity = () => {
    const city = useSelector((state) => state.city.active);

    return (
        <div className={classes.Container}>
            {
                city !== null ? (
                    <>
                        <div className={classes.Temperature}>
                            <WeatherTemperature degrees={city.current.degrees} icon={city.current.icon} />
                        </div>
                        <div className={classes.Text}>
                            <div className={classes.City}>{city.name}</div>
                            <div className={classes.Date}>{formatDate(city.current.date, 'EEEE do, MMMM')}</div>
                            <div className={classes.Weather}>{city.current.label}</div>
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
