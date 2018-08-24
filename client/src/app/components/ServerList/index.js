import React, { Component } from 'react';
import orderBy from 'lodash/orderBy';
import './ServerList.css'

class ServerList extends Component {
  state = {
    serverList: [],
    secondClick: ''
  }

  sortServersBy = (sortKey) => {
    const { serverList } = this.state;

    let sortedServers = (this.state.secondClick === sortKey) ? orderBy(serverList, sortKey, 'desc') : orderBy(serverList, sortKey, 'asc');

    if (this.state.secondClick === sortKey) {
      this.setState({ serverList: sortedServers, secondClick: '' });
    }
    else {
      this.setState({ serverList: sortedServers, secondClick: sortKey });
    }
  }

  getProtocolList = (technologies) => {
    let theFirst = true;
    let protocolList = '';
    Object.entries(technologies).map(e => {
      if (e[1].pivot.status==="online"){
        let prot = e[1].name.replace('OpenVPN ','');
        prot = prot.replace(' Proxy','');
        prot = prot.replace('Obfuscated','Obfs');
        if (theFirst) {
          theFirst = false;
          return protocolList += prot;
        } else {
          return protocolList += ', ' + prot;
        }
      } else return null;
    })

    if (protocolList === '') protocolList = 'No active protocol.';

    return protocolList;
  }

  componentWillReceiveProps(newProps) {
    this.setState({ serverList: JSON.parse(newProps.filteredServers) })
  }

  render() {
    const { serverList } = this.state;
    const { displaySeparate } = this.props;

    return (
      <div>

        {
          serverList.length > 0

          &&

          <table className="server-list-container">

            <tbody>
              <tr>

                  {

                    displaySeparate ?

                    <td id="sname">
                      <table>
                        <tbody>
                        <tr><th onClick={() => this.sortServersBy('name')}>
                          Server Name ({serverList.length})
                        </th></tr>

                        {
                          serverList.map(server =>
                            <tr key={server.id}>
                              <td className="list-item-box" style={server.status==='online' ? {} : { color: 'red' }} >
                                {server.name}
                              </td>
                            </tr>
                          )
                        }

                        </tbody>
                      </table>
                    </td>

                    :

                    <td id="snameandip">
                      <table>
                        <tbody>
                        <tr><th onClick={() => this.sortServersBy('name')}>
                          Server Name ({serverList.length})
                        </th></tr>

                        {
                          serverList.map(server =>
                            <tr key={server.id}>
                              <td className="list-item-box" style={server.status==='online' ? {} : { color: 'red' }} >
                                {server.name} - {(server.ips.type==="exit") ? server.ips.ip : server.station}
                              </td>
                            </tr>
                          )
                        }

                        </tbody>
                      </table>
                    </td>

                  }



                  <td id="scity">
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('locations[0].country.city.name')}>
                        City
                      </th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.id}><td className="list-item-box" >{server.locations[0].country.city.name}</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td id="sdomain">
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('hostname')}>Domain</th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.id}><td className="list-item-box" >{server.hostname}</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  {

                    displaySeparate ?

                    <td  id="sipaddr">
                      <table>
                        <tbody>
                        <tr><th onClick={() => this.sortServersBy('station')}>IP Address</th></tr>

                        {
                          serverList.map(server =>
                            <tr key={server.id}><td className="list-item-box" >{
                              (server.ips.type==="exit") ? server.ips.ip : server.station
                            }</td></tr>
                          )
                        }

                        </tbody>
                      </table>
                    </td>

                    : <td></td>

                  }

                  <td id="sproto">
                    <table>
                      <tbody>
                      <tr><th style={{ cursor: 'default' }}>Supported Protocols</th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.id} style={{ height: 41.19 }}>
                            <td className="list-item-box" >
                              { this.getProtocolList(server.technologies) }
                            </td>
                          </tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td  id="sload">
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('load')}>Load</th></tr>

                      {

                        serverList.map(server =>
                          <tr key={server.id}><td className="list-item-box" >{server.load}%</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td id="sdate">
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('created_at')}>
                        Date
                      </th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.id}><td className="list-item-box" >
                            {
                              server.created_at.split(' ')[0]
                            }
                          </td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

              </tr>
            </tbody>
          </table>
        }

      </div>
    );
  }

}

export default ServerList;
