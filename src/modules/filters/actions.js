import * as types from './actionTypes';

export const displayChange = () => ({
    type: types.DISPLAY_CHANGE,
  }
)

export const headerHide = () => ({
    type: types.HEADER_HIDE,
  }
)

export const filterServersRequest = () => ({
    type: types.FILTER_SERVERS_REQUEST,
  }
)

export const filterServersSuccess = (filteredServers) => ({
    type: types.FILTER_SERVERS_SUCCESS,
    payload: {
      filteredServers
    }
  }
)

export const filterServersFailure = (error) => ({
    type: types.FILTER_SERVERS_FAILURE,
    payload: {
      error
    }
  }
)

export const filterServers = (state, searchType) => {
  return dispatch => {

      const { searchValue, selectCountry, selectProtocol, selectObfs } = state;

      dispatch(filterServersRequest());

      if (!!localStorage.getItem('servers')) {

        const servers = JSON.parse(localStorage.getItem('servers'));
        let filteredServers = [];

        if (servers.length>0) {

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
        alert("Something went wrong...");
        dispatch(filterServersFailure("Servers were not fully fetched yet. Please try refreshing again."));
      }

    }

    else {
      alert("Something went wrong...");
      dispatch(filterServersFailure("Servers were not fully fetched yet. Please choose the country again."));
    }

  }
}
