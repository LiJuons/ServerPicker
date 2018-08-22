import $ from "jquery";
import * as types from './actionTypes';

export const getServersRequest = () => ({
    type: types.GET_SERVERS_REQUEST,
  }
)

export const getServersSuccess = (servers) => ({
    type: types.GET_SERVERS_SUCCESS,
    payload: {
      servers
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

export const getServers = () => {
  return dispatch => {

    if (!!localStorage.getItem('servers')) {
        dispatch(getServersRequest());

        dispatch(
          getServersSuccess(JSON.parse(localStorage.getItem('servers')))
        );
      }
      else {
        dispatch(preApiCall());
      }
    }
}

export const apiCall = () => {
  return dispatch => {

    const API_LINK = process.env.REACT_APP_SECRET_API;
    const url = 'https://allorigins.me/get?url=' + encodeURIComponent(API_LINK) + '&callback=?';

    console.log(API_LINK ? "Server list is being fetched." : "Failed to reach API.");

    dispatch(getServersRequest());

    $.getJSON(url)
    .done((data) => {
      let serverList = JSON.parse(data.contents);
      localStorage.setItem('servers', JSON.stringify(serverList));
      dispatch(getServersSuccess(serverList));
    })
    .fail((error) => {
      dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
    });
  }
}

export const preApiCall = () => {
  return dispatch => {

    if (!!localStorage.getItem('servers')) {
      const serverLength = JSON.parse(localStorage.getItem('servers')).length;
      const API_COUNT = process.env.REACT_APP_API_COUNT;
      const urlForCheck = 'https://allorigins.me/get?url=' + encodeURIComponent(API_COUNT) + '&callback=?';

      $.getJSON(urlForCheck)
      .done((data) => {
        let apiCount = JSON.parse(data.contents).count;

        if (serverLength === apiCount) {
          alert('Server list is refreshed.');
          dispatch(
            getServersSuccess(JSON.parse(localStorage.getItem('servers')))
          );
        }
        else {
          let serversChangeNumber = apiCount - serverLength;
          let addremove = (serversChangeNumber>0) ? 'new servers have been added.' : 'old servers have been removed.';
          alert('New server list is being fetched. \n[' + Math.abs(serversChangeNumber) + '] ' + addremove);
          dispatch(apiCall());
        }

      })
      .fail((error) => {
        console.log(error);
        dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
      });
    }
    else {
      dispatch(apiCall());
    }

  }
}
