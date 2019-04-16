import React from 'react';

export const RotatedIcon = ({ icon }) => (
  <div className="c-rotated-icon">
    <div className="c-rotated-icon__icon">
      <ion-icon name={icon} />
    </div>
  </div>
);
