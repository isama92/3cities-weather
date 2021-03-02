import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { format as formatDate } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import WeatherIcon from 'react-open-weather-icons';
import classes from './City.module.css';

const City = ({ id, name, icon, degrees, date, onClick, onRemove }) => {
    const active = useSelector((state) => state.city.active);
    const cl = [classes.City];
    if (id === active.id) cl.push(classes.Active);

    const canRemove = typeof onRemove === 'function';

    const onRemoveClick = (e) => {
        e.stopPropagation();
        if (typeof onRemove === 'function') {
            onRemove();
        }
    };

    return (
        <div
          className={cl.join(' ')}
          onClick={onClick}
          onKeyPress={onClick}
          role="button"
          tabIndex="0"
          aria-label="Set as active city"
        >
            {
                canRemove ? (
                    <div
                      className={classes.Remove}
                      onClick={onRemoveClick}
                      onKeyPress={onRemoveClick}
                      role="button"
                      tabIndex="0"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                ) : null
            }
            <div>
                <div className={classes.CityName}>{name}</div>
                <div className={classes.CityDate}>{formatDate(date, 'EEEE do, MMMM')}</div>
                <div className={classes.CityTime}>{formatDate(date, 'h:mm aaaa')}</div>
            </div>
            <div><WeatherIcon name={icon} className={classes.CityIcon} /></div>
            <div className={classes.CityDegrees}>{Math.round(degrees)}&deg;</div>
        </div>
    );
};

City.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    degrees: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
};

City.defaultProps = {
    onRemove: null,
};

export default City;
