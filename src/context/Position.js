import React, { useState } from "react";

export const PositionContext = React.createContext();

export default function Position(props) {
  const [position, setPosition] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 15,
    isDefaultPos: true,
  });
  return (
    <PositionContext.Provider value={[position, setPosition]} {...props} />
  );
}
