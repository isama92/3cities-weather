import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import Loading from 'components/Loading/Loading';
import Title from 'components/Title/Title';
import City from 'components/City/City';
import LocalizationCard from './LocalizationCard';
import classes from './LocalizationCity.module.css';

const localizationCity = () => {
    if (!navigator.geolocation) return null;
    const dispatch = useDispatch();
    const bootstrapped = useSelector((state) => state.city.started);
    const geolocating = useSelector((state) => state.city.geolocating);
    const geolocation = useSelector((state) => state.city.geolocation);
    const active = useSelector((state) => state.city.active);

    const startGeolocation = () => {
        dispatch(actions.addGeolocation());
    };

    const removeGeolocation = () => {
        dispatch(actions.removeGeolocation());
    };

    const setActiveCity = () => {
        if (geolocation.id === active.id) return;
        dispatch(actions.setGeolocationAsActive());
    };

    return (
        <div className={classes.Container}>
            <Title>Localization</Title>
            {
                // eslint-disable-next-line no-nested-ternary
                bootstrapped ? (
                    geolocation === null ? (
                        <LocalizationCard onClick={startGeolocation} disabled={geolocating} />
                    ) : (
                        <City
                          id={geolocation.id}
                          name={geolocation.name}
                          icon={geolocation.current.icon}
                          degrees={geolocation.current.degrees}
                          date={geolocation.current.date}
                          onClick={() => setActiveCity()}
                          onRemove={removeGeolocation}
                        />
                    )
                ) : (<Loading variant="dark" />)
            }
        </div>
    );
};

export default localizationCity;
