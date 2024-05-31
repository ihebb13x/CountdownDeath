import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Import the CSS file for styling

function CountdownTimer() {
    const [timeRemaining, setTimeRemaining] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const countdownDate = new Date("2025-01-01T00:00:00").getTime();

        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
            const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeRemaining({
                years,
                days,
                hours,
                minutes,
                seconds
            });

            if (distance < 0) {
                clearInterval(countdown);
                setTimeRemaining({
                    years: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const textColor = timeRemaining.days < 1 ? 'red' : 'white'; /*if we have 1day  */

    return (
        <div className="countdown-container">
            <div id="countdown">
                <span className="countdown-item">
                    <span style={{fontSize: '55px', color: textColor}}>{formatTime(timeRemaining.years)}</span> YRS
                </span>
                <span className="countdown-item">
                    <span style={{fontSize: '55px', color: textColor}}>{formatTime(timeRemaining.days)}</span> DAYS
                </span>
                <span className="countdown-item">
                    <span style={{fontSize: '55px', color: textColor}}>{formatTime(timeRemaining.hours)}</span> HRS
                </span>
                <span className="countdown-item">
                    <span style={{fontSize: '55px', color: textColor}}>{formatTime(timeRemaining.minutes)}</span> MIN
                </span>
                <span className="countdown-item">
                    <span style={{fontSize: '55px'}}>{formatTime(timeRemaining.seconds)}</span> SEC
                </span>
            </div>
        </div>
    );
}

export default CountdownTimer;
