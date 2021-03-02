import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { format as formatDate, getTime } from 'date-fns';
import Title from 'components/Title/Title';
import Loading from 'components/Loading/Loading';
import classes from './ThermometerDay.module.css';

const thermometerDay = () => {
    const thermRef = useRef(null);
    const city = useSelector((state) => state.city.active);
    const hours = city !== null ? [...city.hourly].splice(0, 24) : [];

    const hoursMap = (h, i) => {
        const el = [];
        el.push((
            <div key={`${getTime(h.date)}circle`} className={classes.Circle}>
                <div className={classes.Degrees}>{Math.round(h.degrees)}&deg;</div>
                <div className={classes.Time}>{formatDate(h.date, 'h aaaa')}</div>
            </div>
        ));
        if (i !== hours.length - 1) {
            el.push(<div key={`${getTime(h.date)}line`} className={classes.Line} />);
        }
        return <React.Fragment key={getTime(h.date)}>{el}</React.Fragment>;
    };

    const isVisible = (el) => {
        window.therm = thermRef.current;
        const containerBoundaries = thermRef.current.parentElement.getBoundingClientRect();
        const elBoundaries = el.getBoundingClientRect();
        const topDiff = elBoundaries.top - containerBoundaries.top;
        return topDiff < containerBoundaries.height && topDiff > 0;
    };

    const setTransparencies = () => {
        if (city === null) return;
        const lines = thermRef.current.querySelectorAll(`div.${classes.Line}`);
        let opacity = 1;
        const opacityOffset = 0.15;
        let isFirst = false;
        lines.forEach((line, i) => {
            if (isVisible(line)) {
                // eslint-disable-next-line no-param-reassign
                line.style.background = `linear-gradient(180deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${opacity - opacityOffset}) 100%)`;
                opacity -= opacityOffset;

                if (!isFirst) {
                    if (i > 0) {
                        lines[i - 1].style.background = '#FFF';
                    }
                    isFirst = true;
                }
            }
        });
    };

    useEffect(() => {
        setTransparencies();
    }, [city]);

    return (
        <div className={classes.Container}>
            <Title>Today</Title>
            <div className={classes.Card}>
                {
                    city !== null ? (
                        <Scrollbars onScroll={setTransparencies}>
                            <div className={classes.Thermometer} ref={thermRef}>
                                <div className={classes.ThermometerHeader}>Now</div>
                                <div className={classes.ThermometerBody}>
                                    {hours.map(hoursMap)}
                                </div>
                            </div>
                        </Scrollbars>
                    ) : (
                        <Loading />
                    )
                }
            </div>
        </div>
    );
};

export default thermometerDay;
