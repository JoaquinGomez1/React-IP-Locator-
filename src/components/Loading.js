import React, { useContext, useRef, useEffect } from "react";
import { PositionContext } from "../context/Position";
import "./Loading.css";

export default function Loading() {
  const active = "active";
  const unmounting = "unmounting";
  const disabled = "disabled";

  const [position] = useContext(PositionContext);
  const loadingComp = useRef();

  // Set the component visible or invisible according to the current position isDefaultPos value
  useEffect(() => {
    if (position.isDefaultPos) {
      loadingComp.current.className = "loading " + active;
    }

    if (!position.isDefaultPos) {
      loadingComp.current.className = "loading " + unmounting;
      setTimeout(
        300,
        (() => (loadingComp.current.className = "loading " + disabled))()
      );
    }
  }, [position]);

  return (
    <div ref={loadingComp} className={"loading"}>
      <div>
        <h1 className='loading-child'>Fetching your location...</h1>
        <img
          style={{ maxWidth: "50px" }}
          src={process.env.PUBLIC_URL + "/images/Preloader_1.gif"}
          alt='Loading gif'
        />
      </div>
    </div>
  );
}
