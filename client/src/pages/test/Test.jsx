import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../../Context/globalData";
import LayoutPage from "../layout/LayoutPage";
function Test() {
  const [me, setMe] = useState();
  const { userInformation, socket } = useGlobalContext();

  useEffect(() => {
    socket.on("test", (data) => {
      console.log(data);
      setMe(data);
    });
  }, []);

  return (
    <LayoutPage>
      <h1>test</h1>
      <div>{me && JSON.stringify(me)}</div>
    </LayoutPage>
  );
}

export default Test;
