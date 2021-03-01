import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import WeatherCity from 'components/WeatherCity/WeatherCity';
import ThermometerDay from 'components/ThermometerDay/ThermometerDay';
import WeeklyMonthlyWeather from 'components/WeeklyMonthlyWeather/WeeklyMonthlyWeather';
import classes from './App.module.css';

const app = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.bootstrap());
    }, []);

    return (
        <Container fluid className={classes.Container}>
            <Row className={classes.RowMarginLeftOverride}>
                <Col xs={12} md={9}>
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
                <Col xs={12} md={3}>
                    side
                </Col>
            </Row>
        </Container>
    );
};

export default app;
