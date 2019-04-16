import React from 'react';

export const SectionHeader = ({ title, subtitle }) => (
  <div className="section-header">
    <div className="o-container">
      <h2 className="c-heading-delta u-text-primary">{title}</h2>
      {subtitle && <p className="c-text-body u-text-ash u-margin-bottom--none">{subtitle}</p>}
    </div>
  </div>
);
