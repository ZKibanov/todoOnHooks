import React from 'react';
import PropTypes from 'prop-types';
import lightFormat from 'date-fns/lightFormat';

const Timer = (props) => {
  const {timeLeft,offTimer,onTimer, countdown} = props;
  const timerOff = () => {
    if (!countdown) return;
    offTimer(timeLeft);
  };

  const timerOn = () => {
    if (countdown) return;
    onTimer();
  };
  
  return (
    <div className="description">
      <button type="button" className="icon icon-play" onClick={timerOn} aria-label="start countdown" />{' '}
      <button type="button" className="icon icon-pause" onClick={timerOff} aria-label="start countdown" />
      {lightFormat(new Date(timeLeft), ' mm-ss')}
    </div>
  );
}

Timer.defaultProps = {
  onTimer: () => {},
  offTimer: () => {},
  timeLeft: 0,
  countdown: false,
};

Timer.propTypes = {
  onTimer: PropTypes.func,
  offTimer: PropTypes.func,
  timeLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  countdown: PropTypes.bool,
};

export default Timer;
