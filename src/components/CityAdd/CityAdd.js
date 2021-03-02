import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import classes from './CityAdd.module.css';

const placeholder = ({ onClick }) => (
    <div
      className={classes.Container}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex="0"
      aria-label="Add city"
    >
        <FontAwesomeIcon icon={faPlusSquare} />
        <div>Add city</div>
    </div>
);

placeholder.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default placeholder;
