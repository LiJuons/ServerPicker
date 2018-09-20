import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import localStorage from 'mock-local-storage';
import { configure, shallow } from 'enzyme';
import { SvgIcon } from '../';
import RefreshButton from './';

configure({ adapter: new Adapter() });

describe('<RefreshButton /> component', () => {

  const wrapper = shallow(<RefreshButton refreshed={false} timeout={1800} />);

  it('Should handle click event', () => {
    window.confirm = jest.fn();
    wrapper.find('div').last().simulate('click');
    expect(window.confirm).toHaveBeenCalledTimes(1);
  });

  it('Should show refresh symbol in the button', () => {
    expect(wrapper.contains(<SvgIcon iconType='refreshBtn' />)).toEqual(true);
  });

  it('Should show time in the button', () => {
    wrapper.setProps({ refreshed: true });
    expect(wrapper.contains(<div className="refreshBtnTime" > 30:00 </div>)).toEqual(true);
  });

});
