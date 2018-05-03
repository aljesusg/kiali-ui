import * as React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../LoginPage';
import configureStore from 'redux-mock-store';

const initialState = {
  authentication: false
};

// configureStore
const mockStore = configureStore();

let wrapper;
let store;

describe('#LoginPage render correctly', () => {
  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState);
  });
  it('should render LoginPage', () => {
    wrapper = shallow(<LoginPage dispatch={null} store={store} />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have 2 FormControl input', () => {
    wrapper = shallow(<LoginPage dispatch={null} store={store} />);
    expect(wrapper.find('FormControl').length === 2);
  });
});
