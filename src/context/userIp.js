import React, { useState } from "react";

export const UserContext = React.createContext();

export default function UserContextProvider(props) {
  const [userData, setUserData] = useState([]);

  return <UserContext.Provider value={{ userData, setUserData }} {...props} />;
}
