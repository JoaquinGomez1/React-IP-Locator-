import React, { useEffect, useContext } from "react";
import LeafletMap from "./LeafletMap";
import Layout from "./Layout";
import { UserContext } from "../context/userIp";
import { PositionContext } from "../context/Position";

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
  }, [setUserData, setPosition]);

  return (
    <Layout>
      <div className="wrapper">
        <div className="container" style={{ width: "100%", minHeight: "100%" }}>
          <div className="card info-card" style={{ minWidth: "100%" }}>
            {userData.location ? (
              <img
                src={userData.location.country_flag}
                alt={`${country_name} flag`}
                style={{ margin: "10px", width: "90px", justifySelf: "center" }}
              />
            ) : null}
            <p>Ip: {IPv4 || userData.ip}</p>
            <p style={{ fontSize: "28px" }}>City: {city}</p>

            <p>Country: {country_name}</p>
            <p>Region: {state || userData.region_name}</p>
            <p>Zip code: {postal || userData.zip}</p>
            <p>Latitude: {latitude} </p>
            <p>Longitude: {longitude}</p>
          </div>
        </div>
      </div>
      <h2 style={{ margin: "20px 0" }}></h2>

      <div className="leaflet-container">
        <LeafletMap position={position}></LeafletMap>
      </div>
    </Layout>
  );
}
