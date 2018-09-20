import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import sessionStorage from 'mock-local-storage';
import { configure, shallow } from 'enzyme';
import { ErrorMsg, ServerList, Spinner } from '../../components';
import { ServersPage } from './';

configure({ adapter: new Adapter() });

describe('<ServersPage /> component', () => {

  const history = {replace: () => {}};
  const wrapper = shallow(<ServersPage history={history} />);

  it('Should show wait cursor and the Spinner', () => {
    wrapper.setProps({ isFetching: true });
    expect(wrapper.find('.page-container','.loading').exists()).toEqual(true);
    expect(wrapper.contains(<Spinner />)).toEqual(true);
  });

  it('Should show error', () => {
    let fetchError = "error message";
    wrapper.setProps({ isFetching: false, fetchError });
    expect(wrapper.contains(<ErrorMsg message={fetchError} />)).toEqual(true);
  });

  it('Should display server list', () => {
    wrapper.setProps({ servers: [], filteredServers: [], displaySeparate: true, fetchError: null });
    expect(wrapper.contains(
      <ServerList
          servers={[]}
          filteredServers={JSON.stringify([])}
          displaySeparate={true}
        />
    )).toEqual(true);
  });

});
