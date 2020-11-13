import React, { useContext, useState } from "react";
import { UserContext } from "../context/userIp";
import { PositionContext } from "../context/Position";
import "./Header.css";
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
    <header className='header'>
      <div className='title-container'>
        <h1 className='title'>IP LOCATOR</h1>
      </div>
      <div className='search-bar-container'>
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && fetchData();
          }}
          className='search-input'
          placeholder='Enter an ip address'
        />
        <button className='search-btn' onClick={fetchData}>
          Search
        </button>
      </div>
      <div className='github-icon-container'>
        <a
          href='https://github.com/JoaquinGomez1/React-IP-Locator-'
          target='_blank'>
          <i class='fab fa-github'></i>
        </a>
      </div>
    </header>
  );
}
