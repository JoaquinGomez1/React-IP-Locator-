import React, { useEffect, useContext } from "react";
import LeafletMap from "./LeafletMap";
import Layout from "./Layout";
import { UserContext } from "../context/userIp";
import { PositionContext } from "../context/Position";
import "./layout.css";

export default function Main() {
  const { userData, setUserData } = useContext(UserContext);
  const [position, setPosition] = useContext(PositionContext);

  const { IPv4, city, country_name, postal, latitude, longitude, state } =
    userData !== undefined ? userData : undefined;

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3";
      const req = await fetch(url);
      const res = await req.json();
      setUserData(res);
      setPosition({
        ...position,
        lat: res.latitude,
        lng: res.longitude,
        isDefaultPos: false,
      });
    };

    fetchData();
    //eslint-disable-next-line
  }, [setUserData, setPosition]);

  return (
    <Layout>
      <div className='wrapper'>
        <div className='card info-card'>
          {userData.location ? (
            <img
              src={userData.location.country_flag}
              alt={`${country_name} flag`}
              style={{ margin: "10px", width: "90px", justifySelf: "center" }}
            />
          ) : null}
          <p>Ip: {IPv4 || userData.ip}</p>
          <p>
            <span className='city'> {city} </span>
          </p>

          <p>Country: {country_name}</p>
          <p>Region: {state || userData.region_name}</p>
          <p>Zip code: {postal || userData.zip}</p>
          <p>Latitude: {latitude} </p>
          <p>Longitude: {longitude}</p>
        </div>
      </div>

      <div className='leaflet-container'>
        <LeafletMap position={position} />
      </div>
    </Layout>
  );
}
