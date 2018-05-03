import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Dropdown, Icon } from 'patternfly-react';
import UserDropdown from '../UserDropdown';

describe('userDropdown test', () => {
  it('should render UserDropdown correctly', () => {
    sessionStorage.setItem('user', 'jdoe');
    const wrapper = shallow(<UserDropdown />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('should include the username with Icon ', () => {
    const username = 'jdoe';
    sessionStorage.setItem('user', username);
    const wrapper = mount(<UserDropdown />);
    expect(
      wrapper.find(Dropdown.Toggle).contains(username) &&
        wrapper.find(Dropdown.Toggle).contains(<Icon type="pf" name="user" />)
    ).toBeTruthy();
  });

  it('should include a logout option and remove session storage', () => {
    const username = 'jdoe';
    sessionStorage.setItem('user', username);
    const wrapper = mount(<UserDropdown />);
    expect(wrapper.find('#usermenu_logout').exists()).toBeTruthy();
    expect(wrapper.find('#usermenu_logout').contains(<Icon type="pf" name="key" />)).toBeTruthy();
    const elt = wrapper
      .find('#usermenu_logout')
      .find('SafeAnchor')
      .first();
    elt.simulate('click');
    expect(sessionStorage.getItem('user')).toBeNull();
  });
});
