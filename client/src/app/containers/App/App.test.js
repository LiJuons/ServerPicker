import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow} from 'enzyme';
import sessionStorage from 'mock-local-storage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../state/index';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ServersPage, Login } from '../';
import { Header } from '../../components';
import { App } from './';

configure({ adapter: new Adapter() });

describe('<App /> component', () => {

  const wrapper = shallow(<App authCheck={()=>{}} />);

  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App authCheck={()=>{}}/>
        </BrowserRouter>
      </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should not have <Header /> component without having token', () => {
    expect(wrapper.contains(<Header />)).toEqual(false);
  });

  it('Should have <Header /> component if token is present', () => {
    sessionStorage.setItem = function (key, val) {
         this[key] = val;
    }
    sessionStorage.getItem = function (key) {
        return this[key];
    }

    sessionStorage.setItem("token", "abc1234");

    const wrapperWithToken = shallow(
      <div>
        {
          sessionStorage.getItem("token")
          &&
          <Header />
        }
        <Switch>
          <Route exact={true} path="/" component={ServersPage} />
          <Route exact={true} path="/login" component={Login} />
          <Route path="*" render={() => (<Redirect to="/" />)} />
        </Switch>
      </div>
    );

    expect(wrapperWithToken.contains(<Header />)).toEqual(true);
  });

  it('Should have 3 routes', () => {
    expect(wrapper.find(Route)).toHaveLength(3);
  });

});
