import React, { Component } from 'react';
import orderBy from 'lodash/orderBy';
import './ServerList.css'

class ServerList extends Component {
  state = {
    serverList: [],
    secondClick: '',
    sortInProcess: false
  }

  sortServersBy = (sortKey) => {
    const { serverList } = this.state;
    this.setState({ sortInProcess: true });

    let sortedServers = (this.state.secondClick === sortKey) ? orderBy(serverList, sortKey, 'desc') : orderBy(serverList, sortKey, 'asc');

    if (this.state.secondClick === sortKey) {
      this.setState({ serverList: sortedServers, secondClick: '' }, () => {
        this.setState({ sortInProcess: false })
      });
    }
    else {
      this.setState({ serverList: sortedServers, secondClick: sortKey }, () => {
        this.setState({ sortInProcess: false })
      });
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

  getCategory = (categories) => {
    let categoryList = '';

    Object.entries(categories).map(category => {
        switch (category[1].id){
          case 1:
            return categoryList += "DoubleVPN ";
          case 3:
            return categoryList += "OnionVPN ";
          case 9:
            return categoryList += "Dedicated ";
          case 11:
            return categoryList += "Standard ";
          case 15:
            return categoryList += "P2P ";
          case 17:
            return categoryList += "Obfuscated ";
          case 99:
            return categoryList += "BlackHole ";
          default:
            return categoryList;
        }
      }
    );

    if (categoryList.includes("Standard")&&categoryList.length>9) categoryList = categoryList.replace("Standard ","");

    return categoryList;
  }

  render() {
    const { sortInProcess } = this.state;
    const { displaySeparate, filteredServers } = this.props;
    const serverList = JSON.parse(filteredServers);

    return (
      <div style={ sortInProcess ? { cursor: 'wait' } : { cursor: 'default' } }>

        {
          serverList.length > 0

          &&

          <table className="server-list-container">

            <tbody>
              <tr>

                  {

                    displaySeparate ?

                    <td className='name'>
                      <table>
                        <tbody>
                        <tr><th onClick={() => this.sortServersBy('name')}>
                          <div className="clickable">Server Name ({serverList.length})</div>
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

                    <td className='nameandip'>
                      <table>
                        <tbody>
                        <tr><th onClick={() => this.sortServersBy('name')}>
                          <div className="clickable">Server Name ({serverList.length})</div>
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



                  <td className='city'>
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('locations[0].country.city.name')}>
                        <div className="clickable">City</div>
                      </th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.id}><td className="list-item-box" >{server.locations[0].country.city.name}</td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td className='domain'>
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('hostname')}>
                        <div className="clickable">Domain</div>
                      </th></tr>

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

                    <td  className='ipaddr'>
                      <table>
                        <tbody>
                        <tr><th onClick={() => this.sortServersBy('station')}>
                          <div className="clickable">IP Address</div>
                        </th></tr>

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

                  <td className='category'>
                    <table>
                      <tbody>
                      <tr><th style={{ cursor: 'default' }}>Category</th></tr>

                      {
                        serverList.map(server =>
                          <tr key={server.id}><td className="list-item-box" >
                            { this.getCategory(server.groups) }
                          </td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td className='proto'>
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

                  <td  className='load'>
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('load')}>
                        <div className="clickable">Load</div>
                      </th></tr>

                      {

                        serverList.map(server =>
                          <tr key={server.id}><td className="list-item-box" >
                            {server.load}%
                          </td></tr>
                        )
                      }

                      </tbody>
                    </table>
                  </td>

                  <td className='date'>
                    <table>
                      <tbody>
                      <tr><th onClick={() => this.sortServersBy('created_at')}>
                        <div className="clickable">Date</div>
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
