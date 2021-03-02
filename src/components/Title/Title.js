import React from 'react';
import classes from './Title.module.css';

const title = ({ children }) => (<div className={classes.Title}>{children}</div>);

export default title;
