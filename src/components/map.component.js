import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  Status
} from "@googlemaps/react-wrapper";

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return 'error';
  return 'spinner';
};



function MapComponent({ center, zoom, }) {
    const ref = useRef();
  
    useEffect(() => {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    });
    return <div ref={ref} id="map" />;
}

export { MapComponent }