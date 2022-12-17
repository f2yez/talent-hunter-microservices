import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

//AppContext
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState();

  var socket = io("http://localhost:5009");

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("UserInformation")) {
      const data = JSON.parse(localStorage.getItem("UserInformation"));
      setUserInformation(data);
      if (data.type === "talent") {
        socket.on("connect", () => {
          console.log(socket.id);
          const uData = {
            id: socket.id,
            profileId: data.profileId,
          };
          socket.emit("userData", uData);
        });
        
      }
    }
  }, []);

  const setUser = (data) => {
    setUserInformation(data);
  };

  const logout = () => {
    localStorage.removeItem("UserInformation");
    navigate("/SingIn");
  };

  return (
    <AppContext.Provider
      value={{
        userInformation,
        setUserInformation,
        setUser,
        logout,
        socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
