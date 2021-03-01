import React from 'react';
import PropTypes from 'prop-types';
import { format as formatDate } from 'date-fns';
import WeatherIcon from 'react-open-weather-icons';
import classes from './Cities.module.css';

// TODO: add delete button

const City = ({ name, icon, degrees, date, onClick }) => (
    <div
      className={classes.City}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex="0"
      aria-label="Set as active city"
    >
        <div>
            <div className={classes.CityName}>{name}</div>
            <div className={classes.CityDate}>{formatDate(date, 'EEEE do, MMMM')}</div>
            <div className={classes.CityTime}>{formatDate(date, 'h:mm aaaa')}</div>
        </div>
        <div><WeatherIcon name={icon} className={classes.CityIcon} /></div>
        <div className={classes.CityDegrees}>{Math.round(degrees)}&deg;</div>
    </div>
);

City.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    degrees: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default City;
