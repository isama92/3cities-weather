import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from 'react-open-weather-icons';
import classes from './WeatherTemperature.module.css';

const weatherTemperature = ({ weekday, degrees, icon }) => {
    const degreesClasses = [classes.Degrees];
    if (weekday) degreesClasses.push(classes.DegreesSmall);
    return (
        <div className={classes.Container}>
            {weekday ? (
                <div className={classes.Weekday}>{weekday}</div>
            ) : null}
            <div className={degreesClasses.join(' ')}>{degrees}&deg;</div>
            <WeatherIcon name={icon} className={classes.Icon} />
        </div>
    );
};

weatherTemperature.propTypes = {
    weekday: PropTypes.string,
    degrees: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
};

export default weatherTemperature;
