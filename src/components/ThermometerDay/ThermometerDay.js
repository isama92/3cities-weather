import React from 'react';
import { useSelector } from 'react-redux';
import { format as formatDate, getTime } from 'date-fns';
import Title from 'components/Title/Title';
import Loading from 'components/Loading/Loading';
import classes from './ThermometerDay.module.css';

const thermometerDay = () => {
    const city = useSelector((state) => state.city.active);

    return (
        <div className={classes.Container}>
            <Title>Today</Title>
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
