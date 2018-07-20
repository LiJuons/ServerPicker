import React, { Component } from 'react';
import './ServerList.css'

class ServerList extends Component {
  state = {
    selectValue: '---',
    serverList: []
  }

  handleChange = (e) => {
    this.setState({selectValue:e.target.value});
    console.log(e.target.value);
    this.props.filterFunc(this.props.servers, e.target.value);
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

                  <td>
                    <table>
                      <tbody>
                      <tr><th>
                        Server Name
                      </th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.name}><td className="list-item-box" >{server.name}</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table>
                      <tbody>
                      <tr><th>Domain</th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.domain}><td className="list-item-box" >{server.domain}</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table>
                      <tbody>
                      <tr><th>IP Address</th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.ip_address}><td className="list-item-box" >{server.ip_address}</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table>
                      <tbody>
                      <tr><th>Load</th></tr>

                      {

                        serverList.map(server =>
                          <tr key={server.ip_address}><td className="list-item-box" >{server.load}%</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table>
                      <tbody>
                      <tr><th>Supported Protocols</th></tr>

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
