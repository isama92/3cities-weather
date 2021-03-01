import React from 'react';
import PropTypes from 'prop-types';
import classes from './PageSwitcher.module.css';

const pageSwitcher = ({ setPage, pages, active }) => {
    if (!pages) return null;

    const dots = [...Array(pages)].map((el, i) => {
        const cl = [classes.Dot];
        if ((i) === active) cl.push(classes.Active);
        return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={cl.join(' ')}
              onClick={setPage.bind(this, i)}
              onKeyPress={setPage.bind(this, i)}
              role="button"
              tabIndex="0"
              aria-label="Change page"
            />
        );
    });

    return (
        <div className={classes.Dots}>
            {dots}
        </div>
    );
};

pageSwitcher.propTypes = {
    setPage: PropTypes.func.isRequired,
    pages: PropTypes.number,
    active: PropTypes.number,
};

pageSwitcher.defaultProps = {
    pages: 0,
    active: 0,
};

export default pageSwitcher;
