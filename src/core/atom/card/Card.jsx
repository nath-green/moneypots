import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const Card = ({ children, className, to }) => {
  if (to) {
    return (
      <Link to={to}>
        <div className={classNames('card', className)}>{children}</div>
      </Link>
    );
  }

  return <div className={classNames('card', className)}>{children}</div>;
};
