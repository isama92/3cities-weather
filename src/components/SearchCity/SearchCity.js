import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import Title from 'components/Title/Title';
import classes from './SearchCity.module.css';

const searchCity = () => {
    const dispatch = useDispatch();
    const searching = useSelector((state) => state.city.searching);
    const [search, setSearch] = useState('');

    const onSearch = () => {
        if (typeof search !== 'string' || search.trim().length === 0) return;
        dispatch(actions.setActiveByCityName(search));
        setSearch('');
    };

    const onInputEnter = (e) => {
        if (e.which !== 13) return;
        onSearch();
    };

    return (
        <div className={classes.Container}>
            <Title>Search</Title>
            <div className={classes.InputContainer}>
                <input
                  type="text"
                  placeholder="ex: Miami"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={classes.Input}
                  onKeyPress={onInputEnter}
                  disabled={searching}
                />
                <div
                  className={classes.InputIcon}
                  onClick={onSearch}
                  onKeyPress={onSearch}
                  role="button"
                  tabIndex="0"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        </div>
    );
};

export default searchCity;
