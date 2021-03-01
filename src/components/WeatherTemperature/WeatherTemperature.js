import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from 'react-open-weather-icons';
import classes from './WeatherTemperature.module.css';

const weatherTemperature = ({ weekday, degrees, icon }) => {
    const containerClasses = [classes.Container];
    const degreesClasses = [classes.Degrees];
    if (weekday) {
        containerClasses.push(classes.AllCornersRadius);
        degreesClasses.push(classes.DegreesSmall);
    }
    const intDegrees = Math.round(degrees);
    return (
        <div className={containerClasses.join(' ')}>
            {weekday ? (
                <div className={classes.Weekday}>{weekday}</div>
            ) : null}
            <div className={degreesClasses.join(' ')}>{intDegrees}&deg;</div>
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
