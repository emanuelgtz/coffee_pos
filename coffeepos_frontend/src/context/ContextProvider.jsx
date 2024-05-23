import { useState } from "react";
import { Context } from "./Context";

function ContextProvider({children}) {

  const [data, setData] = useState(null);

  const [item, setItem] = useState();

  const [user, setUser] = useState();

  const [loginStatus, setLoginStatus] = useState();

  return(
    <Context.Provider value={
        {data, setData, item, setItem, user, setUser, loginStatus, setLoginStatus}
      }>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider;