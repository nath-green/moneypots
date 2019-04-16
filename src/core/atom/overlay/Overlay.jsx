import React from 'react';
import classNames from 'classnames';

export const Overlay = ({ children, className, onClose, open = false, scrollable = true }) => {
  if (!open) return null;
  return (
    <div className={classNames('c-overlay', { 'c-overlay--not-scrollable': !scrollable })}>
      <div className="c-overlay__header">
        <button type="button" className="c-overlay__close" onClick={onClose}>
          <ion-icon name="close-circle-outline" />
        </button>
      </div>
      <div className={classNames('c-overlay__content', className)}>{children}</div>
    </div>
  );
};
