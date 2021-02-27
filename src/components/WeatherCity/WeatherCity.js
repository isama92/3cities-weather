import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/Loading/Loading';
import WeatherTemperature from 'components/WeatherTemperature/WeatherTemperature';
import classes from './WeatherCity.module.css';

const weatherCity = ({ city, date, weatherName, weatherDegrees, weatherIcon }) => (
    <div className={classes.Container}>
        {
            city && date && weatherName && weatherDegrees && weatherIcon ? (
                <>
                    <div className={classes.Temperature}>
                        <WeatherTemperature degrees={weatherDegrees} icon={weatherIcon} />
                    </div>
                    <div className={classes.Text}>
                        <div className={classes.City}>{city}</div>
                        <div className={classes.Date}>{date}</div>
                        <div className={classes.Weather}>{weatherName}</div>
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

weatherCity.propTypes = {
    city: PropTypes.string,
    date: PropTypes.string,
    weatherName: PropTypes.string,
    weatherDegrees: PropTypes.number,
    weatherIcon: PropTypes.string,
};

export default weatherCity;
