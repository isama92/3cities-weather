import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import City from './City';
import Placeholder from './Placeholder';
import classes from './Cities.module.css';

const SHOWN = 3;

const Cities = () => {
    // TODO: loading until bootstrapped

    const dispatch = useDispatch();
    const cities = useSelector((state) => state.city.cities);
    const citiesEls = cities.map((city) => (
        <City
          key={city.id}
          name={city.name}
          icon={city.current.icon}
          degrees={city.current.degrees}
          date={city.current.date}
        />
    ));

    const addActiveCity = () => {
        dispatch(actions.addActiveCity());
    };

    // eslint-disable-next-line react/no-array-index-key
    const placeholders = [...Array(SHOWN - cities.length)].map((el, i) => <Placeholder key={i} onClick={addActiveCity} />);
    return (
        <div className={classes.Container}>
            {placeholders}
            {citiesEls.reverse()}
        </div>
    );
};

export default Cities;
