import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import validateLogin from "../utils/validateLogin";
import { useContext } from "react";
import { Context } from "../context/Context";


function Login() {

  const {loginStatus, setLoginStatus} = useContext(Context);
  
  const {
    formState, 
    onInputChange, 
    onInputBlur, 
    setNotValid, 
    onResetForm, 
    setResponse,
    response,
    error, 
    notValid} = useForm(
      {employeeEmail: '', employeePassword: ''}, validateLogin);

  const {employeeEmail, employeePassword} = formState;

  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate('/register');
  };

  const handleHomePage = () => {
    navigate('/login/homepage');
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(formState),
      });

      if(!response.ok) {
        setNotValid(true);
        throw new Error('Response was not work')
      }

      setResponse( await response.json());

      localStorage.setItem('userEmail', formState.employeeEmail);

      setLoginStatus(response.ok)
      console.log(response)

      handleHomePage();

    } catch (error) {
      console.error('Error', error);
    }
  }


  return(
    <div className="flex justify-center h-screen w-screen
      bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="content-center">

        <h1 className="font-bold tracking-wide 
        text-white text-center 
        text-4xl py-6">Login</h1>

      {/* - - - - - - - - - - - */}
        <form onSubmit={onSubmit} action="/submit-login" method="POST" 
        className="flex flex-col shadow-2xl rounded-2xl bg-white">
        
          <label htmlFor="employee-email" className="font-mono 
          antialiased text-gray-600 
          text-center text-base py-5">Email </label>
          <input type="email" 
          id="employee-email" 
          className="
          peer bg-transparent text-blue-gray-700 font-mono 
          antialiased outline outline-0 focus:outline-0 
          disabled:bg-blue-gray-50 
          disabled:border-0 transition-all 
          placeholder-shown:border placeholder-shown:border-blue-gray-200 
          placeholder-shown:border-t-blue-gray-200 border 
          focus:border-2 border-t-transparent focus:border-t-transparent 
          text-base px-3 py-2.5 rounded-[7px] border-blue-gray-200 
          focus:border-y-white mx-10 " 
          name="employeeEmail" 
          value={employeeEmail}
          onBlur={onInputBlur}
          onChange={onInputChange}
          autoComplete="off"
          required
          placeholder="example@gmail.com"/>
        
          {error.employeeEmail && 
            <p className="border border-red-400 rounded-md 
            bg-red-100 px-1 py-2 
            mx-10 
            text-center
            text-red-700">
              {error.employeeEmail}
            </p>
          }

          <br />

          <label htmlFor="employee-password"
          className="font-mono antialiased 
        text-gray-600 text-center text-base">Password </label>
          <input type="password" id="employee-password" 
          className="
          peer bg-transparent text-blue-gray-700 font-sans font-normal 
          outline outline-0 focus:outline-0 
          disabled:bg-blue-gray-50 disabled:border-0 
          transition-all placeholder-shown:border 
          placeholder-shown:border-blue-gray-200
          placeholder-shown:border-t-blue-gray-200 border focus:border-2 
          border-t-transparent focus:border-t-transparent 
          text-sm px-3 py-2.5 rounded-[7px]
          border-blue-gray-200 focus:border-y-white mx-10"
          name="employeePassword" 
          value={employeePassword}
          onBlur={onInputBlur}
          onChange={onInputChange}
          autoComplete="off"
          required
          placeholder="******"/>

          {error.employeePassword && 
            <p className="border border-red-400 rounded-md 
            bg-red-100 px-1 py-2 
            mx-10 
            text-center
            text-red-700">
              {error.employeePassword}
            </p>
          }

          <br />

          {
            notValid && <p className="border border-red-400 
            rounded-md bg-red-100 px-1 py-2 
            mx-10 
            text-center
            text-red-700">Verify email and password</p>
          }
          <div className="flex justify-around">

            <button type="submit" value="Submit" 
            className="p-2 px-6 font-semibold rounded-lg 
            bg-blue-500 shadow-lg shadow-blue-500/50 	
            text-white mx-4 my-1 py-2">Login</button>

            <button type="button" value="Submit"
            onClick={handleCreateAccountClick}
            className="p-2 px-6 font-semibold rounded-lg 
            bg-blue-500 shadow-lg shadow-blue-500/50 	
            text-white mx-4 my-1 py-2">Create Account</button>
          
          </div>
          
          <br />          
        </form>
      </div>

      {/* <UserInfo /> */}

    </div>
  )
}

export default Login;