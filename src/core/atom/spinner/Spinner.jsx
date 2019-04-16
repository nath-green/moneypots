import React from 'react';
import classNames from 'classnames';

export const Spinner = ({ overlay, size, large, small }) => {
  const styles = size
    ? {
        fontSize: `${size}px`
      }
    : {};

  const classes = classNames('spinner', {
    'spinner--large': large,
    'spinner--small': small
  });

  if (overlay) {
    return (
      <div className="spinner-overlay">
        <div className="spinner-container">
          <div className={classes} style={styles} />
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className={classes} style={styles} />
    </div>
  );
};
