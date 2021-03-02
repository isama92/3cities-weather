import React from 'react';
import PropTypes from 'prop-types';
import { format as formatDate } from 'date-fns';
import WeatherIcon from 'react-open-weather-icons';
import classes from './MonthlyWeather.module.css';

const monthlyWeather = ({ monthly }) => (
    <div className={classes.Wrapper}>
        <div className={classes.Container}>
            <div className={classes.Left}>
                <div className={classes.Date}>{formatDate(monthly.date, 'EEE, do LLL')}</div>
                <div className={classes.Icon}>
                    <WeatherIcon name={monthly.icon} />
                </div>
            </div>
            <div className={classes.Right}>
                <div className={classes.DegreesAvg}>{Math.round(monthly.degrees_avg)}&deg;</div>
                <div>{monthly.label}</div>
                <div>The high will be {Math.round(monthly.degrees_max)}&deg;C, the low will be {Math.round(monthly.degrees_min)}&deg;C.</div>
                <div>
                    <div>Humidity: {monthly.humidity}%</div>
                    <div>UVI: {Math.round(monthly.uvi)}</div>
                    <div>Dew point: {Math.round(monthly.dew_point)}&deg;C</div>
                </div>
            </div>
        </div>
    </div>
);

monthlyWeather.propTypes = {
    monthly: PropTypes.object.isRequired,
};

export default monthlyWeather;
