import Adapter from 'enzyme-adapter-react-16';
import { configure} from 'enzyme';
import * as types from './actionTypes';
import * as actions from './actions';

configure({ adapter: new Adapter() });

describe('AUTH module', () => {

  describe('AUTH actions:', () => {
    it('should create initialization action', () => {
      let expectedAction = {
        type: types.AUTH_REQUEST
      };

      expect(actions.authInit()).toEqual(expectedAction)
    });

    it('should create confirmation action', () => {
      let expectedAction = {
        type: types.AUTH_CONFIRM
      };

      expect(actions.authConfirm()).toEqual(expectedAction)
    });

    it('should create successful auth action', () => {
      let token = "abcd123";

      let expectedAction = {
        type: types.AUTH_SUCCESS,
        payload: {
          token
        }
      };

      expect(actions.authSuccess(token)).toEqual(expectedAction);
    });

    it('should create failure action', () => {
      let error = "Unauthorized";

      let expectedAction = {
        type: types.AUTH_FAILURE,
        payload: {
          error
        }
      };

      expect(actions.authFailure(error)).toEqual(expectedAction);
    });

    it('should create logout action', () => {
      let expectedAction = {
        type: types.AUTH_LOGOUT
      };

      expect(actions.authLogout()).toEqual(expectedAction)
    });

  });

});
