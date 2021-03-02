import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import Title from 'components/Title/Title';
import City from 'components/City/City';
import LocalizationCard from './LocalizationCard';
import classes from './LocalizationCity.module.css';

// TODO: card component with bg customizable

const localizationCity = () => {
    const dispatch = useDispatch();
    const geolocation = useSelector((state) => state.city.geolocation);
    const active = useSelector((state) => state.city.active);

    const startGeolocation = () => {
        dispatch(actions.addGeolocation());
    };

    const setActiveCity = () => {
        if (geolocation.id === active.id) return;
        dispatch(actions.setGeolocationAsActive());
    };

    return (
        <div className={classes.Container}>
            <Title>Localization</Title>
            {
                geolocation === null ? (
                    <LocalizationCard onClick={startGeolocation} />
                ) : (
                    <City
                      id={geolocation.id}
                      name={geolocation.name}
                      icon={geolocation.current.icon}
                      degrees={geolocation.current.degrees}
                      date={geolocation.current.date}
                      onClick={() => setActiveCity()}
                    />
                )
            }
        </div>
    );
};

export default localizationCity;
