import React from 'react';
import { Link } from 'react-router-dom';
import { Pound } from '../pound';

export const HeroBalance = ({ type, name, balance, settingsUrl, ctaText = 'Settings' }) => (
  <div className="hero-balance">
    {type && (
      <React.Fragment>
        <p className="c-text-small u-text-clear u-margin-bottom--none">{type}</p>
        <p className="c-heading-delta u-margin-bottom">{name}</p>
      </React.Fragment>
    )}
    <p className="c-text-small u-text-clear u-margin-bottom--none">{type ? 'Balance' : 'Value'}</p>
    <div className="u-flex-space">
      <p className="c-heading-alpha">
        <Pound value={balance} />
      </p>
      {settingsUrl && (
        <Link to={settingsUrl} className="c-btn c-btn--ghost">
          {ctaText}
        </Link>
      )}
    </div>
  </div>
);
