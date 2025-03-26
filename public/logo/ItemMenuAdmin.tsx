import React from "react";

// Define the type for the props
interface IconProps {
  stroke: string;
}

export const ProductLinePart: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-route-square-2"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M14 5a2 2 0 0 0 -2 2v10a2 2 0 0 1 -2 2" />
    <path d="M3 17h4v4h-4z" />
    <path d="M17 3h4v4h-4z" />
  </svg>
);

// ***************************************************************************************************************************//

export const ProductLine: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-rollercoaster"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M3 21a5.55 5.55 0 0 0 5.265 -3.795l.735 -2.205a8.775 8.775 0 0 1 8.325 -6h3.675" />
    <path d="M20 9v12" />
    <path d="M8 21v-3" />
    <path d="M12 21v-10" />
    <path d="M16 9.5v11.5" />
    <path d="M15 3h5v3h-5z" />
    <path d="M6 8l4 -3l2 2.5l-4 3l-1.8 -.5z" />
  </svg>
);

// ***************************************************************************************************************************//

export const Devices: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-devices"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M13 9a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1v-10z" />
    <path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9" />
    <path d="M16 9h2" />
  </svg>
);

// ***************************************************************************************************************************//

export const UploadImage: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-photo-circle-plus"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M15 8h.01" />
    <path d="M20.964 12.806a9 9 0 0 0 -8.964 -9.806a9 9 0 0 0 -9 9a9 9 0 0 0 9.397 8.991" />
    <path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4" />
    <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0" />
    <path d="M16 19.33h6" />
    <path d="M19 16.33v6" />
  </svg>
);

// ***************************************************************************************************************************//

export const Company: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-building-community"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8" />
    <path d="M13 7l0 .01" />
    <path d="M17 7l0 .01" />
    <path d="M17 11l0 .01" />
    <path d="M17 15l0 .01" />
  </svg>
);

// ***************************************************************************************************************************//

export const Group: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-users-group"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
    <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M17 10h2a2 2 0 0 1 2 2v1" />
    <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
  </svg>
);

// ***************************************************************************************************************************//

export const Permission: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-file-like"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M3 16m0 1a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1z" />
    <path d="M6 20a1 1 0 0 0 1 1h3.756a1 1 0 0 0 .958 -.713l1.2 -3c.09 -.303 .133 -.63 -.056 -.884c-.188 -.254 -.542 -.403 -.858 -.403h-2v-2.467a1.1 1.1 0 0 0 -2.015 -.61l-1.985 3.077v4z" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M5 12.1v-7.1a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-2.3" />
  </svg>
);

// ***************************************************************************************************************************//

export const User: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-user"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
);

// ***************************************************************************************************************************//

export const DataType: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-database-cog"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" />
    <path d="M4 6v6c0 1.657 3.582 3 8 3c.21 0 .42 -.003 .626 -.01" />
    <path d="M20 11.5v-5.5" />
    <path d="M4 12v6c0 1.657 3.582 3 8 3" />
    <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M19.001 15.5v1.5" />
    <path d="M19.001 21v1.5" />
    <path d="M22.032 17.25l-1.299 .75" />
    <path d="M17.27 20l-1.3 .75" />
    <path d="M15.97 17.25l1.3 .75" />
    <path d="M20.733 20l1.3 .75" />
  </svg>
);

// ***************************************************************************************************************************//

export const DeviceType: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop-code"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M12.5 16h-8.5a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v8" />
    <path d="M7 20h4" />
    <path d="M9 16v4" />
    <path d="M20 21l2 -2l-2 -2" />
    <path d="M17 17l-2 2l2 2" />
  </svg>
);

// ***************************************************************************************************************************//

export const Function: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-math-function"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M3 19a2 2 0 0 0 2 2c2 0 2 -4 3 -9s1 -9 3 -9a2 2 0 0 1 2 2" />
    <path d="M5 12h6" />
    <path d="M15 12l6 6" />
    <path d="M15 18l6 -6" />
  </svg>
);

// ***************************************************************************************************************************//

export const FunctionParameter: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-indent-decrease"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M20 6l-7 0" />
    <path d="M20 12l-9 0" />
    <path d="M20 18l-7 0" />
    <path d="M8 8l-4 4l4 4" />
  </svg>
);

// ***************************************************************************************************************************//

export const Alarm: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-bell"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
  </svg>
);

// ***************************************************************************************************************************//

export const AlarmDetail: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-alarm-average"
  >
    <path stroke={props.stroke} fill="none" />
    <path d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0 -14 0" />
    <path d="M7 4l-2.75 2" />
    <path d="M17 4l2.75 2" />
    <path d="M8 13h1l2 3l2 -6l2 3h1" />
  </svg>
);
