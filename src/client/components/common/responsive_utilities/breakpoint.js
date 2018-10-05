import React from 'react';
import MediaQuery from 'react-responsive';
import styles from './breakpoint.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


const breakpoints = {  
  desktop: '(min-width: ' + styles.desktopMin + ')',
  tablet: '(min-width: ' + styles.tabletMin +') and (max-width: ' + styles.tabletMax + ')',
  phone: '(max-width: ' + styles.phoneMax + ')',
 };

export default function Breakpoint(props) { 
 const breakpoint = breakpoints[props.name] || breakpoints.wide;
return (
 <MediaQuery {...props } query={breakpoint}>
 {props.children}
 </MediaQuery>
 );
}

export function DesktopBreakpoint(props) {  
  return (  
  <Breakpoint name='desktop'>
  {props.children}
  </Breakpoint>
  );
 }

 export function TabletBreakpoint(props) {
  return (
  <Breakpoint name='tablet'>
  {props.children}
  </Breakpoint>
  );
 }

export function PhoneBreakpoint(props) {
 return (
 <Breakpoint name='phone'>
 {props.children}
 </Breakpoint>
 );
}