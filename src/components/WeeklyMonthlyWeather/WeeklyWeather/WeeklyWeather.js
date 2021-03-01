import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Loading from 'components/Loading/Loading';
import WeatherTemperature from 'components/WeatherTemperature/WeatherTemperature';
import PageSwitcher from 'components/PageSwitcher/PageSwitcher';
import classes from './WeeklyWeather.module.css';

const PER_PAGE = 3;

const weeklyWeather = ({ weekPages }) => {
    const [activeWeekPage, setActiveWeekPage] = useState(0);

    return (
        <>
            <Row>
                {
                    weekPages.length ? (
                        <>
                            {weekPages[activeWeekPage].map((wp) => (
                                <Col key={wp.weekday} className={classes.WeekBlock}>
                                    <WeatherTemperature {...wp} />
                                </Col>
                            ))}

                            {/* add an empty div if there are less then PER_PAGE elements in the page */}
                            {
                                weekPages[activeWeekPage].length < PER_PAGE ? (
                                    [...Array(PER_PAGE - weekPages[activeWeekPage].length)]
                                        // eslint-disable-next-line react/no-array-index-key
                                        .map((el, i) => <Col key={i} className={classes.WeekBlock} />)
                                ) : null
                            }
                        </>
                    ) : (
                        <Loading />
                    )
                }
            </Row>
            <Row>
                <Col className={classes.Switch}>
                    <PageSwitcher
                      setPage={setActiveWeekPage}
                      pages={weekPages.length}
                      active={activeWeekPage}
                    />
                </Col>
            </Row>
        </>
    );
};

weeklyWeather.propTypes = {
    weekPages: PropTypes.array,
};

weeklyWeather.defaultProps = {
    weekPages: [],
};

export default weeklyWeather;
