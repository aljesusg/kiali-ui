import * as React from 'react';
import { Dropdown, Icon, MenuItem } from 'patternfly-react';
import PropTypes from 'prop-types';
import store from '../../store/ConfigStore';
import * as UserAction from '../../actions/UserAction';

type UserProps = {
  dispatch?: any;
  handleAuthenticate: PropTypes.func;
};

type UserState = {
  username: string;
};

class UserDropdown extends React.Component<UserProps, UserState> {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props: UserProps) {
    super(props);
    const actualState = store.getState() || {};
    let username = '';
    if (actualState['authentication']['user'] !== null) {
      username = actualState['authentication']['user']['username'];
    }

    // handle initial path from the browser
    this.state = {
      username: username
    };
  }

  userLogout = () => {
    store.dispatch(UserAction.logout());
    this.props.handleAuthenticate(false);
  };
  render() {
    return (
      <>
        <Dropdown componentClass="li" id="user">
          <Dropdown.Toggle useAnchor={true} className="nav-item-iconic">
            <Icon type="pf" name="user" /> {this.state.username}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem id="usermenu_logout" onClick={() => this.userLogout()}>
              <Icon type="pf" name="key" /> Logout
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
}

export default UserDropdown;
