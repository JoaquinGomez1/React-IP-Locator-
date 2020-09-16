import React, { useContext, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { PositionContext } from "../context/Position";

const LeafletMap = ({ position }) => {
  const [state, setState] = useContext(PositionContext);

  useEffect(() => {
    if (position.length === 2) {
      setState({
        ...state,
        lat: position[0],
        lng: position[1],
      });
    }
  }, [position, setState]);

  return (
    <Map center={{ lat: state.lat, lng: state.lng }} zoom={state.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        className="map-marker"
        position={{ lat: state.lat, lng: state.lng }}
      >
        <Popup>Your position according to your ip address</Popup>
      </Marker>
    </Map>
  );
};

export default LeafletMap;
