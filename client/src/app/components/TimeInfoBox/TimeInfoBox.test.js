import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import TimeInfoBox from './';

configure({ adapter: new Adapter() });

describe('<TimeInfoBox /> component', () => {

  it('Should show TimeInfoBox', () => {
    const wrapper = shallow(<TimeInfoBox shouldDisplay={true} days={31} />);
    expect(wrapper.contains(<div className="infoBox" style={{display: 'block'}}>
        Time filter is now set to <strong>{31}</strong> days.<br/>
        This value can be changed in the Settings.<br/>
        After the change, you must click the Time Filter button again.<br/>
      </div>)).toEqual(true);
  });

  it('Should NOT show TimeInfoBox', () => {
    const wrapper = shallow(<TimeInfoBox shouldDisplay={false} days={31} />);
    expect(wrapper.contains(<div className="infoBox" style={{display: 'none'}}>
        Time filter is now set to <strong>{31}</strong> days.<br/>
        This value can be changed in the Settings.<br/>
        After the change, you must click the Time Filter button again.<br/>
      </div>)).toEqual(true);
  });

});
