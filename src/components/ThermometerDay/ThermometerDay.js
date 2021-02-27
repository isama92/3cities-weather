import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format as formatDate } from 'date-fns';
import { forecastByCity } from 'shared/api/api';
import Loading from 'components/Loading/Loading';
import classes from './ThermometerDay.module.css';

const thermometerDay = () => {
    const city = useSelector(state => state.city.active);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        forecastByCity(city)
            .then(res => {
                setForecast(res);
            });
    }, [city]);

    return (
        <div className={classes.Container}>
            <div className={classes.Title}>Today</div>
            <div className={classes.Card}>
                {
                    forecast !== null ? (
                        <div>
                            {forecast.map(f => <div>{formatDate(f.date, 'h aaaa')}</div>)}
                        </div>
                    ) : (
                        <Loading />
                    )
                }
            </div>
        </div>
    );
};

export default thermometerDay;
