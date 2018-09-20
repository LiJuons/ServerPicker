import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import localStorage from 'mock-local-storage';
import { configure, shallow } from 'enzyme';
import { RefreshButton, SvgIcon, TimeInfoBox } from '../';
import Header from './';

configure({ adapter: new Adapter() });

describe('<Header /> component', () => {

  const wrapper = shallow(<Header filterNewServers={()=>{}} />);
  wrapper.setState({ showHeader: true, showSettings: false, showTimeInfo: false, timePiece: 31 });

  it('Should show and hide the NavBar', () => {
    expect(wrapper.find('.navBar').exists()).toEqual(true);
    expect(wrapper.find('.navBar-hidden').exists()).toEqual(false);
    wrapper.setState({ showHeader: false });
    expect(wrapper.find('.navBar').exists()).toEqual(false);
    expect(wrapper.find('.navBar-hidden').exists()).toEqual(true);
  });

  it('Should contain Filters and Settings', () => {
    expect(wrapper.find('.headerFilters').exists()).toEqual(true);
    expect(wrapper.find('.headerSettings').exists()).toEqual(true);
  });

  it('Should handle click events', () => {
    expect(wrapper.state().showTimeInfo).toEqual(false);
    wrapper.find('#clockBtnDiv').simulate('click');
    expect(wrapper.state().showTimeInfo).toEqual(true);
  });

  describe('Filters and Settings (inputs):', () => {

    it('Should contain two selects - country and protocol', () => {
      expect(wrapper.find('select')).toHaveLength(2);
      expect(wrapper.find('#country').exists()).toEqual(true);
      expect(wrapper.find('#protocol').exists()).toEqual(true);
    });

    it('Should contain one checkbox input for XOR filter', () => {
      expect(wrapper.find('#checkXOR').exists()).toEqual(true);
      expect(wrapper.find('[type="checkbox"]')).toHaveLength(1);
    });

    it('Should contain display setting with two radio inputs', () => {
      expect(wrapper.find('.navBar-settings-left').exists()).toEqual(true);
      expect(wrapper.find('[type="radio"]')).toHaveLength(2);
    });

    it('Should contain timepiece setting with one range input and days count', () => {
      expect(wrapper.find('.navBar-settings-right').exists()).toEqual(true);
      expect(wrapper.find('[type="range"]')).toHaveLength(1);
      expect(wrapper.contains(
        <div id="timepiece-value">Days: <i style={{ textDecoration: 'underline' }}>{31}</i></div>
      )).toEqual(true);
    });

  });

  describe('Buttons:', () => {

    it('Should contain the close button', () => {
      expect(wrapper.find('#closeBtnDiv').exists()).toEqual(true);
    });

    it('Should contain the settings button', () => {
      expect(wrapper.contains(<SvgIcon iconType="settingsBtn" />)).toEqual(true);
    });

    it('Should contain the filter-back button', () => {
      wrapper.setState({ showSettings: true });
      expect(wrapper.contains(<SvgIcon iconType="filterBackBtn" />)).toEqual(true);
    });

    it('Should contain the clock button', () => {
      expect(wrapper.contains(<SvgIcon iconType="clockBtn" />)).toEqual(true);
    });

    it('Should contain the logout button', () => {
      expect(wrapper.contains(<SvgIcon iconType="logoutBtn" />)).toEqual(true);
    });

    it('Should contain the refresh button', () => {
      expect(wrapper.find(RefreshButton).exists()).toEqual(true);
    });

    it('Should contain the search button', () => {
      expect(wrapper.contains(<SvgIcon iconType="searchBtn" />)).toEqual(true);
    });

    it('Should contain the filter button', () => {
      expect(wrapper.contains(<SvgIcon iconType="filterBtn" />)).toEqual(true);
    });

  });

});
