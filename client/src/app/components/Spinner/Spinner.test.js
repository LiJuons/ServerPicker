import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Spinner from './';

configure({ adapter: new Adapter() });

describe('<Spinner /> component', () => {

  it('Should show Spinner type 1', () => {
    const wrapper = shallow(<Spinner type={1} />);
    expect(wrapper.contains(<div className="bubbles_container1">
        <div className="bubbles_type1 bubble_1"></div>
        <div className="bubbles_type1 bubble_2"></div>
        <div className="bubbles_type1 bubble_3"></div>
      </div>)).toEqual(true);
  });

  it('Should show Spinner type 2', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.contains(<div className="bubbles_container2">
        <div className="bubbles_type2 bubble_1"></div>
        <div className="bubbles_type2 bubble_2"></div>
        <div className="bubbles_type2 bubble_3"></div>
      </div>)).toEqual(true);
  });

});
