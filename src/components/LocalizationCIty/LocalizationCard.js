import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import classes from './LocalizationCity.module.css';

const localizationCard = ({ onClick, disabled }) => {
    const localize = () => {
        if (disabled) return;
        onClick();
    };

    const cl = [classes.LocalizationButton];
    if (disabled) cl.push(classes.Disabled);

    return (
        <div
          className={cl.join(' ')}
          onClick={localize}
          onKeyPress={localize}
          role="button"
          tabIndex="0"
        >
            <div><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
            <div>Add localization</div>
        </div>
    );
};

localizationCard.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

localizationCard.defaultProps = {
    disabled: false,
};

export default localizationCard;
