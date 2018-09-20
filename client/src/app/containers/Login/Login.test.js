import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import sessionStorage from 'mock-local-storage';
import { configure, shallow } from 'enzyme';
import { Spinner, ErrorMsg } from '../../components';
import { Login } from './';

configure({ adapter: new Adapter() });

describe('<Login /> component', () => {

  const wrapper = shallow(<Login authProccessing={false} />);

  it('Should show error message', () => {
    let error = "error message";
    wrapper.setState({ error });
    expect(wrapper.contains(<ErrorMsg message={error}/>)).toEqual(true);
  });

  it('Should contain two input fields (username, password)', () => {
    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('[name="username"]').exists()).toEqual(true);
    expect(wrapper.find('[name="password"]').exists()).toEqual(true);
  });

  it('Should contain a submit button with text "Login"', () => {
    expect(wrapper.find('[type="submit"]').exists()).toEqual(true);
    expect(wrapper.contains("Login")).toEqual(true);
  });

  it('Should contain a submit button with text "Login"', () => {
    expect(wrapper.find('[type="submit"]').exists()).toEqual(true);
    expect(wrapper.contains("Login")).toEqual(true);
  });

  it('Should contain a submit button with spinner if authProc=true', () => {
    wrapper.setProps({ authProccessing: true })
    expect(wrapper.find('[type="submit"]').exists()).toEqual(true);
    expect(wrapper.contains(<Spinner type={1} style={{ left: 80 }} />)).toEqual(true);
  });

  it('Should handle click events', () => {
    const mockCheck = jest.fn(() => Promise.reject({}));
    wrapper.setProps({ authRequest: mockCheck })
    wrapper.find('[type="submit"]').simulate('click');
    expect(mockCheck).toHaveBeenCalled();
  });

});
