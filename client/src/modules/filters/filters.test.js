import Adapter from 'enzyme-adapter-react-16';
import { configure} from 'enzyme';
import * as types from './actionTypes';
import * as actions from './actions';

configure({ adapter: new Adapter() });

describe('FILTERS module', () => {

  describe('FILTERS actions:', () => {
    it('should create display change action', () => {
      let expectedAction = {
        type: types.DISPLAY_CHANGE,
      };

      expect(actions.displayChange()).toEqual(expectedAction)
    });

    it('should create header hide action', () => {
      let expectedAction = {
        type: types.HEADER_HIDE,
      };

      expect(actions.headerHide()).toEqual(expectedAction)
    });

    it('should create filter request action', () => {
      let expectedAction = {
        type: types.FILTER_SERVERS_REQUEST,
      };

      expect(actions.filterServersRequest()).toEqual(expectedAction);
    });

    it('should create filter success action', () => {
      let filteredServers = [];
      let expectedAction = {
        type: types.FILTER_SERVERS_SUCCESS,
        payload: {
          filteredServers
        }
      };

      expect(actions.filterServersSuccess(filteredServers)).toEqual(expectedAction);
    });

    it('should create filter failure action', () => {
      let error = "Filtering failure";
      let expectedAction = {
        type: types.FILTER_SERVERS_FAILURE,
        payload: {
          error
        }
      };

      expect(actions.filterServersFailure(error)).toEqual(expectedAction)
    });

  });

});
