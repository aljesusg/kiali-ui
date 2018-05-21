import React from 'react';
import { Alert, Row, Col, Form, FormGroup, FormControl, Button, HelpBlock } from 'patternfly-react';
import { connect } from 'react-redux';
import * as UserAction from '../../actions/UserAction';
import PropTypes from 'prop-types';
import { KEY_CODES } from '../../config';
import SocialLink from '../../components/SocialLinks/SocialLink';

const kialiTitle = require('../../assets/img/kiali-title.svg');

type LoginProps = {
  dispatch: any;
};

type LoginState = {
  username: string;
  password: string;
  submitted: boolean;
  showError: boolean;
  messageError: string;
};

export class LoginPage extends React.Component<LoginProps, LoginState> {
  static contextTypes = {
    store: PropTypes.object
  };
  constructor(props: LoginProps) {
    super(props);

    // reset login status
    this.props.dispatch(UserAction.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false,
      showError: false,
      messageError: ''
    };
  }

  componentDidMount() {
    // Change layout-pf layout-pf-fixed by
    document.documentElement.className = 'login-pf';
  }

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ submitted: true, showError: false, messageError: '' });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(UserAction.login(username, password));
    }
  };

  handleKeyPress = (e: any) => {
    if (e.charCode === KEY_CODES.ENTER_KEY) {
      this.handleSubmit(e);
    }
  };

  render() {
    const { store } = this.context;
    store.subscribe(() => {
      const actualState = store.getState().authentication;
      if (actualState.error !== undefined) {
        this.setState({
          submitted: false,
          showError: true,
          messageError: actualState.message
        });
      }
      if (actualState.loggedIn) {
        this.setState({
          submitted: false,
          showError: false
        });
      }
    });
    return (
      <div className={'login-pf-page'}>
        <div className={'container-fluid'}>
          <Row>
            <Col sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
              <header className={'login-pf-page-header'}>
                <img className={'login-pf-brand'} src={kialiTitle} alt={'logo'} />
              </header>
              <Row>
                <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={8} lgOffset={2}>
                  <div className={'card-pf'}>
                    <header className={'login-pf-header'}>{this.state.submitted && <h3>Logging...</h3>}</header>
                    {this.state.showError && <Alert>{this.state.messageError}</Alert>}
                    <Form onSubmit={e => this.handleSubmit(e)} id={'kiali-login'}>
                      <FormGroup>
                        <FormControl
                          id="username"
                          type="text"
                          name="username"
                          onChange={this.handleChange}
                          placeholder={'Username'}
                          disabled={false}
                          required={true}
                          onKeyPress={this.handleKeyPress}
                        />
                        {this.state.submitted && !this.state.username && <HelpBlock>Username is required</HelpBlock>}
                      </FormGroup>
                      <FormGroup>
                        <FormControl
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                          placeholder={'Password'}
                          disabled={false}
                          required={true}
                          onKeyPress={this.handleKeyPress}
                        />
                        {this.state.submitted && !this.state.password && <HelpBlock>Password is required</HelpBlock>}
                      </FormGroup>
                      <Button
                        type="submit"
                        onKeyPress={this.handleKeyPress}
                        className="btn btn-primary btn-block btn-lg"
                      >
                        Log In
                      </Button>
                    </Form>
                  </div>
                  <footer className={'login-pf-page-footer'}>
                    <SocialLink />
                  </footer>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
};

const ConnectedLoginPage = connect(mapStateToProps)(LoginPage);
export default ConnectedLoginPage;
