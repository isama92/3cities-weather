import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import WeatherCity from 'components/WeatherCity/WeatherCity';
import ThermometerDay from 'components/ThermometerDay/ThermometerDay';
import classes from './App.module.css';

const app = () => {
    const data = {
        city: 'Turin',
        date: 'Friday 18, September',
        weatherName: 'Sunny',
        weatherDegrees: 22,
        weatherIcon: '01d',
    };

    return (
        <Container fluid className={classes.Container}>
            <Row className={classes.RowMarginLeftOverride}>
                <Col xs={12} md={8}>
                    <Row>
                        <Col>
                            <WeatherCity
                              city={data.city}
                              date={data.date}
                              weatherName={data.weatherName}
                              weatherDegrees={data.weatherDegrees}
                              weatherIcon={data.weatherIcon}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}><ThermometerDay /></Col>
                        <Col xs={8}>2</Col>
                    </Row>
                </Col>
                <Col xs={12} md={2}>
                    side
                </Col>
            </Row>
        </Container>
    );
};

export default app;
