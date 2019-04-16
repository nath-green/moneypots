import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavStrip = ({ url }) => (
  <div className="nav-strip">
    <NavLink exact to={url} className="nav-strip-item" activeClassName="nav-strip-item--active">
      <ion-icon name="home" class="nav-strip-item__icon" />
      <p className="nav-strip-item__text">Home</p>
    </NavLink>
    <NavLink
      exact
      to={`${url}/pots`}
      className="nav-strip-item"
      activeClassName="nav-strip-item--active"
    >
      <ion-icon name="apps" class="nav-strip-item__icon" />
      <p className="nav-strip-item__text">Pots</p>
    </NavLink>
    <NavLink
      exact
      to={`${url}/transaction`}
      className="nav-strip-item"
      activeClassName="nav-strip-item--active"
    >
      <ion-icon name="add-circle-outline" class="nav-strip-item__icon" />
      <p className="nav-strip-item__text">Transaction</p>
    </NavLink>
    <NavLink
      exact
      to={`${url}/settings`}
      className="nav-strip-item"
      activeClassName="nav-strip-item--active"
    >
      <ion-icon name="settings" class="nav-strip-item__icon" />
      <p className="nav-strip-item__text">Settings</p>
    </NavLink>
  </div>
);
