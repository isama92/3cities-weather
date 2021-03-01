import React from 'react';
import { useSelector } from 'react-redux';
import { format as formatDate, getTime } from 'date-fns';
import Loading from 'components/Loading/Loading';
import classes from './ThermometerDay.module.css';

const thermometerDay = () => {
    const city = useSelector((state) => state.city.active);

    return (
        <div className={classes.Container}>
            <div className={classes.Title}>Today</div>
            <div className={classes.Card}>
                {
                    city !== null ? (
                        <div>
                            {city.hourly.map((f) => <div key={getTime(f.date)}>{formatDate(f.date, 'h aaaa')}</div>)}
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
