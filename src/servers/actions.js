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

export const getServers = () => {
  return dispatch => {
      dispatch(getServersRequest());

      if (!!sessionStorage.getItem('servers')) {
        console.log(JSON.parse(sessionStorage.getItem('servers'))[0]);
        dispatch(
          getServersSuccess(JSON.parse(sessionStorage.getItem('servers')))
        );
      }

      const url = 'https://allorigins.me/get?url=' + encodeURIComponent('https://api.nordvpn.com/server') + '&callback=?';

      $.getJSON(url)
      .done((data) => {
      	let serverList = JSON.parse(data.contents);
        sessionStorage.setItem('servers', JSON.stringify(serverList));
        dispatch(getServersSuccess(serverList));
      })
      .fail((error) => {
        console.log(error);
        dispatch(getServersFailure(error));
        alert("Failed to fetch the servers.");
      });

    }
}

export const filterServers = (servers, country) => {
  return dispatch => {
    dispatch(getServersRequest());

    let filteredServers = [];

    servers.forEach(server => {
      if (server.name.includes(country)){
        filteredServers.push(server);
      }
    })

    dispatch(filterServersSuccess(filteredServers));
  }
}

export const filterServersSuccess = (filteredServers) => ({
    type: types.FILTER_SERVERS,
    payload: {
      filteredServers: filteredServers
    }
  }
)
