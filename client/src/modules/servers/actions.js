import 'whatwg-fetch';
import * as types from './actionTypes';

export const getServersRequest = () => ({
      type: types.GET_SERVERS_REQUEST,
  }
)

export const getServersSuccess = (servers, shouldUpdate) => ({
      type: types.GET_SERVERS_SUCCESS,
      payload: {
        servers,
        shouldUpdate
      }
  }
)

export const getServersFailure = (error) => ({
      type: types.GET_SERVERS_FAILURE,
      payload: {
        error
      }
  }
)

//Updates the client's server list from servers.json
export const getServers = () => {
  return dispatch => {

    fetch('/servers', {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${sessionStorage.token}`
      }
    }).then(response => response.json()).then(json => {
      const serverList = json.data;
      if (serverList && serverList.length>0) {
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem('listLength', serverList.length);
        }
        dispatch(getServersSuccess(serverList, true));
      }
      else {
        dispatch(apiCall());
      }
    }).catch( () => {
      dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
    });

  }
}

//Calls to API to fetch the new server list into the servers.json file => if success, calls getServers
export const apiCall = () => {
  return dispatch => {

      dispatch(getServersRequest());

      fetch('/updateServers', {
        headers: {
          Accept: 'application/json',
          Authorization: `JWT ${sessionStorage.token}`
        }
      }).then(response => response.json()).then((result) => {
        dispatch(getServers());
      }).catch(() => {
        dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
      });
  }
}

//Compares the length of current and fetched server list, if different - calls the apiCall
export const preApiCall = () => {
  return (dispatch) => {
      if (typeof(Storage) !== "undefined") {
        const { listLength } = localStorage;
        if (!!listLength) {
          const serverListLength = (listLength > 0) ? parseInt(listLength, 10) - 12 : 0;

          fetch('/serverCount', {
            headers: {
              Accept: 'application/json',
              Authorization: `JWT ${sessionStorage.token}`
            }
          }).then(response => response.json()).then((result) => {
            const apiCount = result.data.count;
            if (serverListLength === apiCount) {
              alert('Server list is refreshed.');
              dispatch(getServersSuccess([], false));
            }
            else {
              const serversChangeNumber = apiCount - serverListLength;
              const addremove = (serversChangeNumber>0) ? 'new servers have been added.' : 'old servers have been removed.';

              alert('New server list is being fetched. \n[' + Math.abs(serversChangeNumber) + '] ' + addremove);
              dispatch(apiCall());
            }

          }).catch(() => {
            dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
          });

        }
        else {
          dispatch(apiCall());
        }
      }
      else {
        dispatch(apiCall());
      }

  }
}
