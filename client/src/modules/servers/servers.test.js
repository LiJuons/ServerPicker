import Adapter from 'enzyme-adapter-react-16';
import { configure} from 'enzyme';
import * as types from './actionTypes';
import * as actions from './actions';

configure({ adapter: new Adapter() });

describe('FILTERS module', () => {

  describe('FILTERS actions:', () => {
    it('should create request action', () => {
      let expectedAction = {
        type: types.GET_SERVERS_REQUEST,
      };

      expect(actions.getServersRequest()).toEqual(expectedAction)
    });

    it('should create success action', () => {
      let expectedAction = {
        type: types.GET_SERVERS_SUCCESS,
      };

      expect(actions.getServersSuccess()).toEqual(expectedAction)
    });

    it('should create update action', () => {
      let servers = [];
      let expectedAction = {
        type: types.GET_SERVERS_UPDATE,
        payload: {
          servers
        }
      };

      expect(actions.getServersUpdate(servers)).toEqual(expectedAction);
    });

    it('should create failure action', () => {
      let error = "Fetching failure";
      let expectedAction = {
        type: types.GET_SERVERS_FAILURE,
        payload: {
          error
        }
      };

      expect(actions.getServersFailure(error)).toEqual(expectedAction)
    });

  });

});
