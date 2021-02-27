import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import WeatherCity from 'components/WeatherCity/WeatherCity';
import ThermometerDay from 'components/ThermometerDay/ThermometerDay';
import classes from './App.module.css';

const app = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.bootstrap());
    }, []);

    return (
        <Container fluid className={classes.Container}>
            <Row className={classes.RowMarginLeftOverride}>
                <Col xs={12} md={8}>
                    <Row>
                        <Col>
                            <WeatherCity />
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
