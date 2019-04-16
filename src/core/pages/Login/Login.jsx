import React from 'react';
import toastr from 'toastr';
import { Input, Button, SectionHeader, RotatedIcon } from '../../atom';
import moneypotsStore from '../../utils/store';
import * as actions from '../../utils/actions';
import { _password, _email } from '../../utils/validation';
import { handleInputChange } from '../../utils/lib';

export class Login extends React.Component {
  state = {
    email: '',
    password: '',
    emailError: false,
    emailErrors: [],
    passwordError: false,
    passwordErrors: [],
    loading: false
  };

  componentDidMount() {
    moneypotsStore.on('loginFailed', this.loginFailed);
  }

  componentWillUnmount() {
    moneypotsStore.removeListener('loginFailed', this.loginFailed);
  }

  loginFailed = () => {
    toastr.error('Login failed');
    this.setState({
      loading: false
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    this.setState({
      loading: true
    });

    const validEmail = _email.validate(email);
    const validPassword = _password.validate(password);

    if (validEmail && validPassword) {
      actions.login({ email, password });
    } else {
      this.setState({
        emailError: !validEmail,
        emailErrors: _email.errors(),
        passwordError: !validPassword,
        passwordErrors: _password.errors(),
        loading: false
      });
    }
  };

  onKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.handleSubmit();
    }
  };

  render() {
    const {
      email,
      password,
      emailError,
      emailErrors,
      passwordError,
      passwordErrors,
      loading
    } = this.state;

    return (
      <React.Fragment>
        <div className="o-container">
          <SectionHeader title="Login" subtitle="Access your account" />

          <div className="o-row u-padding u-margin-top u-margin-bottom u-background-silver">
            <RotatedIcon icon="star" />
            <Input
              value={email}
              id="email"
              type="text"
              onChange={event => handleInputChange(this, event)}
              onKeyDown={this.onKeyDown}
              labelText="Email address"
              className="u-margin-bottom"
              placeholder="jon@winterfell.co.uk"
              iconName="mail"
              error={emailError}
              errorText={emailErrors}
            />
            <Input
              value={password}
              id="password"
              type="password"
              onChange={event => handleInputChange(this, event)}
              onKeyDown={this.onKeyDown}
              labelText="Password"
              className="u-margin-bottom"
              placeholder="Password"
              iconName="lock"
              error={passwordError}
              errorText={passwordErrors}
            />
            <Button
              text="Login"
              onClick={this.handleSubmit}
              className="c-btn--full"
              modifier={{ loading }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
