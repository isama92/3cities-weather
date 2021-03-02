import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format as formatDate } from 'date-fns';
import { chunk } from 'lodash';
import Loading from 'components/Loading/Loading';
import WeeklyWeather from './WeeklyWeather/WeeklyWeather';
import MonthlyWeather from './MonthlyWeather/MonthlyWeather';
import classes from './WeeklyMonthlyWeather.module.css';

const PAGE_WEEK = 'WEEK';
const PAGE_MONTH = 'MONTH';

const weeklyMonthlyWeather = () => {
    const [page, _setPage] = useState(PAGE_WEEK);
    const [weekPages, setWeekPages] = useState([]);
    const city = useSelector((state) => state.city.active);

    useEffect(() => {
        if (city !== null) {
            const wps = city.daily.map((d) => ({
                weekday: formatDate(d.date, 'EEEE'),
                icon: d.icon,
                degrees: d.degrees,
            }));
            setWeekPages(chunk(wps, 3));
        }
    }, [city]);

    const setPage = (p) => {
        if (p === page) return;
        _setPage(p);
    };

    const weekClasses = [classes.Page];
    const monthClasses = [classes.Page];
    if (page === PAGE_WEEK) {
        weekClasses.push(classes.PageActive);
        weekClasses.push(classes.Gradient);
    }
    if (page === PAGE_MONTH) {
        monthClasses.push(classes.PageActive);
        monthClasses.push(classes.Gradient);
    }

    let activePage = null;
    if (city !== null) {
        switch (page) {
            default:
            case PAGE_WEEK:
                activePage = <WeeklyWeather weekPages={weekPages} />;
                break;
            case PAGE_MONTH:
                activePage = <MonthlyWeather monthly={city.monthly} />;
                break;
        }
    }

    return (
        <div className={classes.Container}>
            <div className={classes.PagesContainer}>
                <div className={classes.Pages}>
                    <div
                      className={weekClasses.join(' ')}
                      onClick={setPage.bind(this, PAGE_WEEK)}
                      onKeyPress={setPage.bind(this, PAGE_WEEK)}
                      role="button"
                      tabIndex="0"
                    >
                        <div className={classes.PageText}>This week</div>
                    </div>
                    <div
                      className={monthClasses.join(' ')}
                      onClick={setPage.bind(this, PAGE_MONTH)}
                      onKeyPress={setPage.bind(this, PAGE_MONTH)}
                      role="button"
                      tabIndex="0"
                    >
                        <div className={classes.PageText}>This month</div>
                    </div>
                </div>
            </div>
            <div className={[classes.Blocks, classes.Gradient].join(' ')}>
                {city !== null ? activePage : <Loading />}
            </div>
        </div>
    );
};

export default weeklyMonthlyWeather;
