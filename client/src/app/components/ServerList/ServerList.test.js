import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ServerList from './';

configure({ adapter: new Adapter() });

describe('<ServerList /> component', () => {

  const servers=[
    {
        "id": 30001,
        "created_at": "1901-01-01 00:00:00",
        "name": "Server #1",
        "station": "1.1.1.1",
        "hostname": "server1.domain.com",
        "load": -1,
        "status": "online",
        "locations": [
            {
                "country": {
                    "name": "Canada",
                    "city": {
                        "name": "Toronto"
                    }
                }
            }
        ],
        "technologies": [
            {
                "id": 7,
                "name": "Socks 5",
                "pivot": {
                    "status": "online"
                }
            }
        ],
        "ips": [
            {
                "type": "entry",
                "ip": {
                    "id": 30001,
                    "ip": "1.1.1.1",
                    "version": 4
                }
            }
        ]
    },
    {
        "id": 30002,
        "created_at": "1901-01-01 00:00:00",
        "name": "Server #2",
        "station": "1.1.1.2",
        "hostname": "server2.domain.com",
        "load": -1,
        "status": "online",
        "locations": [
            {
                "country": {
                    "name": "Canada",
                    "city": {
                        "name": "Toronto"
                    }
                }
            }
        ],
        "technologies": [
            {
                "id": 7,
                "name": "Socks 5",
                "pivot": {
                    "status": "online"
                }
            }
        ],
        "ips": [
            {
                "type": "entry",
                "ip": {
                    "id": 30002,
                    "ip": "1.1.1.2",
                    "version": 4
                }
            }
        ]
    }
  ]
  const wrapper = shallow(<ServerList displaySeparate={true}/>);
  const wrapper2 = shallow(<ServerList displaySeparate={false}/>);
  wrapper.setState({ serverList: servers });
  wrapper2.setState({ serverList: servers });

  it('Should display separate NAME column', () => {
    expect(wrapper.find('.name').exists()).toEqual(true);
  });

  it('Should display merged NAME and IP column', () => {
    expect(wrapper2.find('.nameandip').exists()).toEqual(true);
  });

  it('Should have a list of two servers', () => {
    expect(wrapper.state('serverList')).toHaveLength(2);
  });

  it('Should contain server #1 name', () => {
    expect(wrapper.contains(<tr key={30001}>
                  <td className="list-item-box" style={{}} >
                    Server #1
                  </td>
                </tr>)).toEqual(true);
  });

  it('Should contain server #2 name and IP', () => {
    expect(wrapper2.contains(<tr key={30002}>
                  <td className="list-item-box" style={{}} >
                    Server #2 - 1.1.1.2
                  </td>
                </tr>)).toEqual(true);
  });

  it('Should contain server #1 city', () => {
    expect(wrapper.contains(<tr key={30001}>
                  <td className="list-item-box" >
                    Toronto
                  </td>
                </tr>)).toEqual(true);
  });

  it('Should contain server #2 domain', () => {
    expect(wrapper2.contains(<tr key={30002}>
                  <td className="list-item-box" >
                    server2.domain.com
                  </td>
                </tr>)).toEqual(true);
  });

  it('Should contain server #1 load', () => {
    expect(wrapper.contains(<tr key={30001}>
                  <td className="list-item-box" >
                    -1%
                  </td>
                </tr>)).toEqual(true);
  });

  it('Should contain server #2 protocol list', () => {
    expect(wrapper2.contains(<tr key={30002} style={{ height: 41.19 }}>
                  <td className="list-item-box" >
                    Socks 5
                  </td>
                </tr>)).toEqual(true);
  });

  it('Should contain server #1 IP', () => {
    expect(wrapper.contains(<tr key={30001}>
                  <td className="list-item-box" >
                    1.1.1.1
                  </td>
                </tr>)).toEqual(true);
  });

  it('Should contain server #2 date', () => {
    expect(wrapper2.contains(<tr key={30002}>
                  <td className="list-item-box" >
                    1901-01-01
                  </td>
                </tr>)).toEqual(true);
  });

});
