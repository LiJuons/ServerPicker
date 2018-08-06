import React from 'react';
import './Spinner.css';

const Spinner = (props) => (
  <div>
    <div className={ props.type === 1 ? "bubbles_container1" : "bubbles_container2" }>
      <div className={ props.type === 1 ? "bubbles bubbles_type1 bubble_1" : "bubbles bubbles_type2 bubble_1" }></div>
      <div className={ props.type === 1 ? "bubbles bubbles_type1 bubble_2" : "bubbles bubbles_type2 bubble_2" }></div>
      <div className={ props.type === 1 ? "bubbles bubbles_type1 bubble_3" : "bubbles bubbles_type2 bubble_3" }></div>
    </div>
  </div>
);

export default Spinner;
