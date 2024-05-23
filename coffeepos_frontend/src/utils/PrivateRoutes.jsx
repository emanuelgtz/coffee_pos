import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Context } from "../context/Context";

const PrivateRoutes = () => {

  const {loginStatus} = useContext(Context)

  let auth = {'ok': loginStatus};

  console.log(auth)

  return(
    auth.ok ? <Outlet /> : <Navigate to="/login"/> 
  )
}

export default PrivateRoutes;