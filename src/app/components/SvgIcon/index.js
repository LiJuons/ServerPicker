import React from 'react';
import ReactSVG from 'react-svg';
import { closeBtn, logoutBtn, filterBtn, refreshBtn, searchIco } from '../../../assets';
import './SvgStyle.css';

const SvgIcon = (props) => (
  <div>
    {
      props.iconType === "closeBtn"
      ? <ReactSVG path={closeBtn} svgClassName={ props.toggle ? "closeBtn" : "closeBtn rotate" } />
      : props.iconType === "logoutBtn"
      ? <ReactSVG path={logoutBtn} svgClassName="logoutBtn" />
      : props.iconType === "filterBtn"
      ? <ReactSVG path={filterBtn} svgClassName="filterBtn" />
      : props.iconType === "refreshBtn"
      ? <ReactSVG path={refreshBtn} svgClassName="refreshBtn" />
      : props.iconType === "searchIco"
      ? <ReactSVG path={searchIco} svgClassName="searchIco" />
      : "Icon type was not selected."
    }
  </div>
);

export default SvgIcon;
