import $ from "jquery";
import * as types from './actionTypes';

export const clearServers = () => ({
  type: types.CLEAR_SERVERS
})

export const searchServers = (searchValue) => ({
    type: types.SEARCH_SERVERS,
    payload: {
      searchValue
    }
  }
)

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

export const filterServersSuccess = (filteredServers) => ({
    type: types.FILTER_SERVERS,
    payload: {
      filteredServers
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
        dispatch(apiCall());
      }
    }
}

export const apiCall = () => {
  return dispatch => {
    const API_LINK = process.env.REACT_APP_SECRET_API;
    const url = 'https://allorigins.me/get?url=' + encodeURIComponent(API_LINK) + '&callback=?';

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

export const filterServers = (state, searchType) => {
  return dispatch => {

      const { searchValue, selectCountry, selectProtocol, selectObfs } = state;

      dispatch(getServersRequest());

      if (!!localStorage.getItem('servers')) {

        const servers = JSON.parse(localStorage.getItem('servers'));
        let filteredServers = [];

        if (searchType === 'filter') //If filter search
        {
          if ( (selectCountry !== '---') && (selectProtocol !== '---') ) {
            //Search by Country, Protocol and XOR
            servers.forEach(server => {

              if ( server.locations[0].country.name.toUpperCase().includes(selectCountry.toUpperCase()) ){
                let found = false;

                if ( selectObfs === false ) {
                  // if XOR OFF
                  Object.entries(server.technologies).map(e => {
                    if (e[1].name.toUpperCase().includes(selectProtocol.toUpperCase()) && e[1].pivot.status==="online" && !found) {
                      found = true;
                      return filteredServers.push(server);
                    } else return null;
                  });
                }

                else {
                  // if XOR ON
                  Object.entries(server.technologies).map(e => {
                    if ((e[1].id===15 && e[1].pivot.status==="online" && !found) || (e[1].id===17 && e[1].pivot.status==="online" && !found)){
                      found = true;
                      return filteredServers.push(server);
                    } else return null;
                  });
                }
              }
            });
          }

          if ( (selectCountry !== '---') && (selectProtocol === '---') ) {
            //Search by Country and XOR
            servers.forEach(server => {

              if ( server.locations[0].country.name.toUpperCase().includes(selectCountry.toUpperCase()) ){
                let found = false;

                if ( selectObfs === false ) {
                  // if XOR OFF
                  Object.entries(server.technologies).map(e => {
                    if ((e[1].id<15 && e[1].pivot.status==="online" && !found)){
                      found = true;
                      return filteredServers.push(server);
                    } else return null;
                  });
                }

                else {
                  // if XOR ON
                  Object.entries(server.technologies).map(e => {
                    if ((e[1].id===15 && e[1].pivot.status==="online" && !found) || (e[1].id===17 && e[1].pivot.status==="online" && !found)){
                      found = true;
                      return filteredServers.push(server);
                    } else return null;
                  });
                }
              }
            });
          }

          if ( (selectCountry === '---') && (selectProtocol !== '---') ) {
            //Search by Protocol and XOR
            servers.forEach(server => {
                let found = false;

                if ( selectObfs === false ) {
                  // if XOR OFF
                  Object.entries(server.technologies).map(e => {
                    if (e[1].name.toUpperCase().includes(selectProtocol.toUpperCase()) && e[1].pivot.status==="online" && !found) {
                      found = true;
                      return filteredServers.push(server);
                    } else return null;
                  });
                }

                else {
                  // if XOR ON
                  Object.entries(server.technologies).map(e => {
                    if ((e[1].id===15 && e[1].pivot.status==="online" && !found) || (e[1].id===17 && e[1].pivot.status==="online" && !found)) {
                      found = true;
                      return filteredServers.push(server);
                    } else return null;
                  });
                }
              });
          }


          if ( (selectCountry === '---') && (selectProtocol === '---') ) {
            //Search by XOR
            servers.forEach(server => {
                let found = false;

                if ( selectObfs === false ) {
                  // if XOR OFF
                  Object.entries(server.technologies).map(e => {
                    if ((e[1].id<15 && e[1].pivot.status==="online" && !found)) {
                      found = true;
                      return filteredServers.push(server);
                    } else return null;
                  });
                }

                else {
                  // if XOR ON
                  Object.entries(server.technologies).map(e => {
                    if ((e[1].id===15 && e[1].pivot.status==="online" && !found) || (e[1].id===17 && e[1].pivot.status==="online" && !found)) {
                      found = true;
                      return filteredServers.push(server);
                    } else return null;
                  });
                }
            });
          }
        }

        else if (searchType === 'search' && searchValue.length > 0)
        {
          let searchVal = searchValue.toUpperCase();

          servers.forEach(server => {
            if (
                (server.name.toUpperCase().includes(searchVal)) ||
                (server.locations[0].country.city.name.toUpperCase().includes(searchVal)) ||
                (server.hostname.toUpperCase().includes(searchVal)) ||
                (server.station.includes(searchVal))
              ){
              return filteredServers.push(server);
            }
          });
        }

        dispatch(filterServersSuccess(filteredServers));

    }

    else {
      alert("Too soon!");
      dispatch(getServersFailure("Servers were not fully fetched yet. Please choose the country again."));
    }

  }
}
