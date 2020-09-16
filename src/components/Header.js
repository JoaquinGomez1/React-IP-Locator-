import React, { useContext, useState } from "react";
import { UserContext } from "../context/userIp";
import { PositionContext } from "../context/Position";
require("dotenv").config();

export default function Header() {
  const { setUserData } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState();
  const [position, setPosition] = useContext(PositionContext);

  const fetchData = async () => {
    setPosition({ ...position, isDefaultPos: true });

    const req = await fetch(
      `https://cors-anywhere.herokuapp.com/api.ipstack.com/${searchInput}?access_key=${process.env.REACT_APP_AUTH_KEY}`
    );
    const res = await req.json();
    setUserData(res);
    setPosition({
      ...position,
      lat: res.latitude,
      lng: res.longitude,
      isDefaultPos: false,
    });
  };

  return (
    <header className="header">
      <div style={{ padding: " 0 20px" }}>
        <h1 href={"/"} style={{ color: "white", margin: "10px 0" }}>
          IP LOCATOR
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="search-input"
          style={{
            minWidth: "40%",
            padding: "15px 20%",
            textAlign: "center",
            border: "none",
            borderRadius: "5px 0 0 5px",
            fontSize: "18px",
          }}
          placeholder="Enter an ip address"
        />
        <button
          className="search-btn"
          style={{
            background: "#1AAA33",
            border: "none",
            padding: " 0 10px",
            fontWeight: "600",
            color: "white",
            cursor: "pointer",
          }}
          onClick={fetchData}
        >
          Search
        </button>
      </div>
    </header>
  );
}
