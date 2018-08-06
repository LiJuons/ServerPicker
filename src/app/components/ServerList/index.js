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

  componentWillReceiveProps(newProps) {
    this.setState({ serverList: JSON.parse(newProps.filteredServers) })
  }

  render() {
    const { serverList } = this.state;

    return (
      <div>

        {
          serverList.length > 0

          &&

          <table className="server-list-container">

            <tbody>
              <tr>

                  <td id="sname">
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('name')}>
                        Server Name ({serverList.length})
                      </th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.name}><td className="list-item-box" >{server.name}</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td id="sdomain">
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('domain')}>Domain</th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.domain}><td className="list-item-box" >{server.domain}</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td  id="sipaddr">
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('ip_address')}>IP Address</th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.ip_address}><td className="list-item-box" >{server.ip_address}</td></tr>
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
                          <tr key={server.ip_address}><td className="list-item-box" >{server.load}%</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td  id="sproto">
                    <table>
                      <tbody>
                      <tr><th style={{ cursor: 'default' }}>Supported Protocols</th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.ip_address}><td className="list-item-box" >
                                {
                                  Object.entries(server.features).map(e => {
                                    let prot = e[0].replace('openvpn_','');
                                    prot = prot.replace('proxy_','');
                                    return e[1] ? prot + ' ' : '';
                                  }
                                  )
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
