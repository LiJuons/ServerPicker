import React from 'react';
import ReactSVG from 'react-svg';
import { closeBtn, clockBtn, logoutBtn, filterBtn, filterBackBtn, refreshBtn, settingsBtn, searchBtn } from '../../../assets';
import './SvgStyle.css';

const SvgIcon = (props) => (
  <div>
    {
      props.iconType === "closeBtn"
      ? <ReactSVG path={closeBtn} svgClassName={ props.toggle ? "closeBtn" : "closeBtn rotate" } />
      : props.iconType === "clockBtn"
      ? <ReactSVG path={clockBtn} svgClassName="clockBtn" />
      : props.iconType === "logoutBtn"
      ? <ReactSVG path={logoutBtn} svgClassName="logoutBtn" />
      : props.iconType === "filterBtn"
      ? <ReactSVG path={filterBtn} svgClassName="filterBtn" />
      : props.iconType === "filterBackBtn"
      ? <ReactSVG path={filterBackBtn} svgClassName="filterBackBtn" />
      : props.iconType === "refreshBtn"
      ? <ReactSVG path={refreshBtn} svgClassName="refreshBtn" />
      : props.iconType === "settingsBtn"
      ? <ReactSVG path={settingsBtn} svgClassName="settingsBtn" />
      : props.iconType === "searchBtn"
      ? <ReactSVG path={searchBtn} svgClassName="searchBtn" />
      : "Icon type was not selected."
    }
  </div>
);

export default SvgIcon;
