import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import WeatherCity from 'components/WeatherCity/WeatherCity';
import ThermometerDay from 'components/ThermometerDay/ThermometerDay';
import WeeklyMonthlyWeather from 'components/WeeklyMonthlyWeather/WeeklyMonthlyWeather';
import Cities from 'components/Cities/Cities';
import SearchCity from 'components/SearchCity/SearchCity';
import LocalizationCity from 'components/LocalizationCIty/LocalizationCity';
import classes from './App.module.css';

const app = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.bootstrap());
    }, []);

    return (
        <Container fluid className={classes.Container}>
            <Row className={classes.RowMarginLeftOverride}>
                <Col xs={12} md={7} xl={8}>
                    <Row>
                        <Col>
                            <WeatherCity />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} xl={4}><ThermometerDay /></Col>
                        <Col xs={12} xl={8}><WeeklyMonthlyWeather /></Col>
                    </Row>
                </Col>
                <Col xs={12} md={5} xl={4}>
                    <Row>
                        <Col>
                            <Cities />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SearchCity />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <LocalizationCity />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default app;
