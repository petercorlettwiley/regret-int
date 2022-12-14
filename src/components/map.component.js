import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  Status
} from "@googlemaps/react-wrapper";

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return 'error';
  return 'spinner';
};



function MapComponent({ center, zoom }) {
    const ref = useRef();
    const { children };
  
    useEffect(() => {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    });

  return (
    <>
      <div ref={ref} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
}

export { MapComponent }