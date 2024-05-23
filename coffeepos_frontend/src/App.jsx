import { Navigate, Route, Routes } from "react-router-dom"
import CreateAccount from "./pages/CreateAccount"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import UserInfo from "./components/UserInfo"
import ContextProvider from "./context/ContextProvider"
import PrivateRoutes from "./utils/PrivateRoutes"


function App() {

  return (
    <ContextProvider>  
      <Routes>    
        <Route element={<PrivateRoutes />}>
            <Route path="/login/userinfo" exact element={<UserInfo /> } />
            <Route path="/login/homepage" exact element={<HomePage />} />
        </Route>

          {/* Default path */}
        <Route path="/*" element={<Navigate to='/login' />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
      </ Routes>  
    </ ContextProvider>
  )
}



export default App;