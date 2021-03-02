import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import classes from './Loading.module.css';

const loading = ({ variant }) => (
    <div className={classes.Container}>
        <Spinner animation="border" variant={variant} />
    </div>
);

loading.propTypes = {
    variant: PropTypes.oneOf(['light', 'dark']),
};

loading.defaultProps = {
    variant: 'light',
};

export default loading;
