import React from 'react';
import './TimeInfoBox.css';

const TimeInfoBox = (props) => (
  <div className="infoBox" style={ props.shouldDisplay ? { display: "block" } : { display: "none" } }>
    Time filter is now set to <strong>{props.days}</strong> days.<br/>
    This value can be changed in the Settings.<br/>
    After the change, you must click the Time Filter button again.<br/>
  </div>
);

export default TimeInfoBox;
