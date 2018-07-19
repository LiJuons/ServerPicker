import React, { Component } from 'react';
import country_list from '../../../assets/countryList';
import './ServerList.css'

class ServerList extends Component {
  state = {
    selectValue: '---'
  }

  handleChange = (e) => {
    this.setState({selectValue:e.target.value});
    console.log(e.target.value);
    this.props.filterFunc(this.props.servers, e.target.value);
  }

  render() {
    const { servers, filteredServers } = this.props;
    const serverList = (this.state.selectValue === '---') ? [] : JSON.parse(filteredServers);

    return (
      <div>

        <div>
          Country Name

          <select
            id="country"
            value={this.state.selectValue}
            onChange={this.handleChange}
            style={{ width: 150, marginLeft: 10 }}
          >
            {
              country_list.map(country =>
                <option key={country} value={country}>{country}</option>
              )
            }
          </select>
          
        </div>


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
                          <div className="protocols">
                            <div className="protocolsShow">
                              {
                                Object.entries(server.features).map(e => {
                                  let prot = e[0].replace('openvpn_','');
                                  prot = prot.replace('proxy_','');
                                  return e[1] ? prot + ' ' : '';
                                }
                                )
                              }
                            </div>
                          </div>
                        </td></tr>
                      )
                    }

                    </tbody>
                  </table>
                </td>

            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default ServerList;
