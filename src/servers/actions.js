import $ from "jquery";
import * as types from './actionTypes';

export const clearServers = () => ({
  type: types.CLEAR_SERVERS
})

export const getServersRequest = () => ({
    type: types.GET_SERVERS_REQUEST,
  }
)

export const getServersSuccess = (servers) => ({
    type: types.GET_SERVERS_SUCCESS,
    payload: {
      servers: servers
    }
  }
)

export const getServersFailure = (error) => ({
    type: types.GET_SERVERS_FAILURE,
    payload: {
      error: error
    }
  }
)

export const filterServersSuccess = (filteredServers) => ({
    type: types.FILTER_SERVERS,
    payload: {
      filteredServers: filteredServers
    }
  }
)

export const getServers = () => {
  return dispatch => {

      if (!!sessionStorage.getItem('servers')) {
        dispatch(getServersRequest());

        dispatch(
          getServersSuccess(JSON.parse(sessionStorage.getItem('servers')))
        );
      }
      else {
        dispatch(apiCall());
      }
    }
}

export const apiCall = () => {
  return dispatch => {
    const url = 'https://allorigins.me/get?url=' + encodeURIComponent('https://api.nordvpn.com/server') + '&callback=?';

    dispatch(getServersRequest());

    $.getJSON(url)
    .done((data) => {
      let serverList = JSON.parse(data.contents);
      sessionStorage.setItem('servers', JSON.stringify(serverList));
      dispatch(getServersSuccess(serverList));
    })
    .fail((error) => {
      dispatch(getServersFailure("Failed to fetch the servers.\nPlease try refreshing the page."));
    });
  }
}

export const filterServers = (country) => {
  return dispatch => {

    if (!!sessionStorage.getItem('servers')) {

      const servers = JSON.parse(sessionStorage.getItem('servers'));
      let filteredServers = [];

      dispatch(getServersRequest());

      servers.forEach(server => {
        if (server.name.includes(country)){
          filteredServers.push(server);
        }
      })

      dispatch(filterServersSuccess(filteredServers));
    }
    else {
      alert("Too soon!");
      dispatch(getServersFailure("Servers were not fully fetched yet. Please choose the country again."));
    }

  }
}
