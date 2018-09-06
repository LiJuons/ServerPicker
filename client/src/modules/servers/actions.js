import $ from "jquery";
import * as types from './actionTypes';

export const getServersRequest = () => ({
      type: types.GET_SERVERS_REQUEST,
  }
)

export const getServersSuccess = () => ({
      type: types.GET_SERVERS_SUCCESS,
  }
)

export const getServersFailure = (error) => ({
      type: types.GET_SERVERS_FAILURE,
      payload: {
        error
      }
  }
)

export const getServersUpdate = (servers) => ({
      type: types.GET_SERVERS_UPDATE,
      payload: {
        servers
      }
  }
)

//Updates the client's server list from servers.json
export const getServers = () => {
  return dispatch => {

    $.getJSON('/servers')
    .done((result) => {
      const serverList = result.data;

      if (serverList && serverList.length>0) {
        localStorage.setItem('servers', JSON.stringify(serverList));
        dispatch(getServersUpdate(serverList));
      }
      else {
        dispatch(apiCall());
      }
    })
    .fail((error) => {
      dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
    });

  }
}

//Calls to API to fetch the new server list into the servers.json file => if success, calls getServers
export const apiCall = () => {
  return dispatch => {

      dispatch(getServersRequest());

      $.getJSON('/updateServers')
      .done((result) => {
        dispatch(getServers());
      })
      .fail((error) => {
        dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
      });
  }
}

//Compares the length of current and fetched server list, if different - calls the apiCall
export const preApiCall = () => {
  return dispatch => {

      if (!!localStorage.getItem('servers')) {

        let serverLength = JSON.parse(localStorage.getItem('servers')).length;
        serverLength = (serverLength > 0) ? serverLength : 0;

        $.getJSON('/serverCount')
        .done((result) => {
          const apiCount = result.data.count;

          if (serverLength === apiCount) {
            alert('Server list is refreshed.');
            dispatch(getServersSuccess());
          }
          else {
            const serversChangeNumber = apiCount - serverLength;
            const addremove = (serversChangeNumber>0) ? 'new servers have been added.' : 'old servers have been removed.';

            alert('New server list is being fetched. \n[' + Math.abs(serversChangeNumber) + '] ' + addremove);
            dispatch(apiCall());
          }

        })
        .fail((error) => {
          dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
        });
      }
      else {
        dispatch(apiCall());
      }

  }
}
