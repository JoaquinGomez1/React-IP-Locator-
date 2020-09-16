import React from "react";
import "./App.css";
import Main from "./components/main";
import Loading from "./components/Loading";

import UserProvider from "./context/userIp";
import PositionContext from "./context/Position";

function App() {
  return (
    <UserProvider>
      <PositionContext>
        <div className="App">
          <Loading></Loading>
          <Main></Main>
        </div>
      </PositionContext>
    </UserProvider>
  );
}

export default App;
