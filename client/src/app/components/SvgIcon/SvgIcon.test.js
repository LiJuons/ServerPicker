import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ReactSVG from 'react-svg';
import { closeBtn, clockBtn, logoutBtn, filterBtn, filterBackBtn, refreshBtn, settingsBtn, searchBtn } from '../../../assets';
import SvgIcon from './';

configure({ adapter: new Adapter() });

describe('<SvgIcon /> component', () => {

  it('Should return closeBtn', () => {
    const wrapper = shallow(<SvgIcon iconType="closeBtn" toggle={true} />);
    expect(wrapper.contains(<div>
        <ReactSVG
          path={closeBtn}
          svgClassName="closeBtn"
        />
      </div>)).toEqual(true);
  });

  it('Should return clockBtn', () => {
    const wrapper = shallow(<SvgIcon iconType="clockBtn" />);
    expect(wrapper.contains(<div>
        <ReactSVG
          path={clockBtn}
          svgClassName="clockBtn"
        />
      </div>)).toEqual(true);
  });

  it('Should return logoutBtn', () => {
    const wrapper = shallow(<SvgIcon iconType="logoutBtn" />);
    expect(wrapper.contains(<div>
        <ReactSVG
          path={logoutBtn}
          svgClassName="logoutBtn"
        />
      </div>)).toEqual(true);
  });

  it('Should return filterBtn', () => {
    const wrapper = shallow(<SvgIcon iconType="filterBtn" />);
    expect(wrapper.contains(<div>
        <ReactSVG
          path={filterBtn}
          svgClassName="filterBtn"
        />
      </div>)).toEqual(true);
  });

  it('Should return filterBackBtn', () => {
    const wrapper = shallow(<SvgIcon iconType="filterBackBtn" />);
    expect(wrapper.contains(<div>
        <ReactSVG
          path={filterBackBtn}
          svgClassName="filterBackBtn"
        />
      </div>)).toEqual(true);
  });

  it('Should return refreshBtn', () => {
    const wrapper = shallow(<SvgIcon iconType="refreshBtn" />);
    expect(wrapper.contains(<div>
        <ReactSVG
          path={refreshBtn}
          svgClassName="refreshBtn"
        />
      </div>)).toEqual(true);
  });

  it('Should return settingsBtn', () => {
    const wrapper = shallow(<SvgIcon iconType="settingsBtn" />);
    expect(wrapper.contains(<div>
        <ReactSVG
          path={settingsBtn}
          svgClassName="settingsBtn"
        />
      </div>)).toEqual(true);
  });

  it('Should return searchBtn', () => {
    const wrapper = shallow(<SvgIcon iconType="searchBtn" />);
    expect(wrapper.contains(<div>
        <ReactSVG
          path={searchBtn}
          svgClassName="searchBtn"
        />
      </div>)).toEqual(true);
  });

  it('Should return nothing', () => {
    const wrapper = shallow(<SvgIcon />);
    expect(wrapper.contains(<div>Icon type was not selected.</div>)).toEqual(true);
  });

});
