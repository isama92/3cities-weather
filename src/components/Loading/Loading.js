import React from 'react';
import { Spinner } from 'react-bootstrap';
import classes from './Loading.module.css';

const loading = () => (
    <div className={classes.Container}>
        <Spinner animation="grow" variant="light" />
    </div>
);

export default loading;
