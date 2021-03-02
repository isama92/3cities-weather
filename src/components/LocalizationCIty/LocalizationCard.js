import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import classes from './LocalizationCity.module.css';

const localizationCard = ({ onClick }) => (
    <div
      className={classes.LocalizationButton}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex="0"
    >
        <div><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
        <div>Add localization</div>
    </div>
);

localizationCard.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default localizationCard;
