import React from 'react';
import classNames from 'classnames';

export const Progress = ({ value, className }) => {
  let progressRating;

  if (value < 33) {
    progressRating = 'low';
  }

  if (value >= 33 && value < 70) {
    progressRating = 'med';
  }

  if (value >= 70) {
    progressRating = 'high';
  }

  return (
    <div
      className={classNames(
        'c-progress',
        `c-progress--${progressRating}`,
        'u-margin-top',
        className
      )}
    >
      <div className="c-progress__percentage" style={{ width: `${value}%` }} />
    </div>
  );
};
