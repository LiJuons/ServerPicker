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

export const filterNewServers = (timePiece, servers) => {
  return dispatch => {
    dispatch(filterServersRequest());

    if (!!servers) {
      let filteredServers = [];

      if (servers.length>0) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd > timePiece) {
          dd -= timePiece;
        } else {
          mm -= 1;
          dd = new Date(yyyy, mm, 0).getDate() - (timePiece - dd);
        }

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        servers.forEach(server => {

          if ( server.created_at.split(' ')[0]>=today){
            return filteredServers.push(server);
          }
        });

        if (filteredServers.length>0) {
          dispatch(filterServersSuccess(filteredServers));
        } else {
          dispatch(filterServersFailure("No servers found."));
        }
      }

      else {
        alert("Something went wrong...");
        dispatch(filterServersFailure("Servers were not fully fetched yet. Please try refreshing again."));
      }

    }
    else {
      alert("Something went wrong...");
      dispatch(filterServersFailure("Servers were not fully fetched yet. Please try refreshing again."));
    }

  }
}

export const filterServers = (state, servers, searchType) => {
  return dispatch => {

      const { searchValue, selectCountry, selectProtocol, selectObfs } = state;

      dispatch(filterServersRequest());

      if (!!servers) {
        let filteredServers = [];

        if (servers.length>0) { //if there are servers

          if (searchType === 'filter' && ((selectCountry!=='---') || (selectProtocol!=='---') || (selectObfs===true))) //If filter search
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

          else {
            dispatch(filterServersFailure("No servers found."));
          }

          if (filteredServers.length>0) {
            dispatch(filterServersSuccess(filteredServers));
          } else {
            dispatch(filterServersFailure("No servers found."));
          }

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
