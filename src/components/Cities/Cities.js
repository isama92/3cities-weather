import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import CityAdd from 'components/CityAdd/CityAdd';
import City from 'components/City/City';
import Loading from 'components/Loading/Loading';
import classes from './Cities.module.css';

const SHOWN = 3;

const Cities = () => {
    const dispatch = useDispatch();
    const bootstrapped = useSelector((state) => state.city.started);
    const cities = useSelector((state) => state.city.cities);
    const active = useSelector((state) => state.city.active);

    const setActiveCity = (cityId) => {
        if (active.id === cityId) return;
        dispatch(actions.setActiveByCityId(cityId));
    };

    const addActiveCity = () => {
        dispatch(actions.addActiveCity());
    };

    const removeCity = (cityId) => {
        dispatch(actions.removeCity(cityId));
    };

    const citiesEls = cities.map((city) => (
        <City
          key={city.id}
          id={city.id}
          name={city.name}
          icon={city.current.icon}
          degrees={city.current.degrees}
          date={city.current.date}
          onClick={() => setActiveCity(city.id)}
          onRemove={() => removeCity(city.id)}
        />
    ));

    return (
        <div className={classes.Container}>
            {
                bootstrapped ? (
                    <>
                        {cities.length < SHOWN ? (<CityAdd onClick={addActiveCity} />) : null}
                        {citiesEls.reverse()}
                    </>
                ) : (<Loading variant="dark" />)
            }

        </div>
    );
};

export default Cities;
