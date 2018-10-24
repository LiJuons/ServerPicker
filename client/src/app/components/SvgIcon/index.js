import React from 'react';
import ReactSVG from 'react-svg';
import * as svgs from '../../../assets/svg';
import './SvgStyle.css';

const SvgIcon = ({ iconType, toggle }) => (
      svgs[iconType] && <ReactSVG path={svgs[iconType]} svgClassName={ toggle != null ? (toggle ? 'closeBtn' : "closeBtn rotate") : iconType} />
);

export default SvgIcon;
