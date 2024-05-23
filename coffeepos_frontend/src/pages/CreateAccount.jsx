import {useState } from "react";
import { useForm } from "../hooks/useForm";
import validateCreateAccount from "../utils/validateCreateAccount";

import { json, useNavigate } from "react-router-dom";

function CreateAccount() {

  const {
    formState, 
    onInputChange,
    onInputBlur,
    onResetForm, 
    setResponse,
    setNotValid,
    error} = useForm({
      employeeName: '',
      employeeEmail: '', 
      employeeAge: '',
      employeePassword: '',
      employeeAuthority: ''
    }, validateCreateAccount);

    

  const {employeeName, employeeEmail, employeeAge, 
  employeePassword, employeeAuthority} = formState;

  const navigate = useNavigate();


  const handleLoginClick = () => {
    navigate('/login');
  }


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/register', {
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
      
      console.log(response, 'this is the answer');
      console.log(json)
      console.log(formState)

      onResetForm();

    } catch (error) {
      console.error('Error', error);
    }
  }

  return(
    <div className="flex justify-center h-screen
      bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="content-center">

        <h1 className="font-bold tracking-wide text-white text-center 
        text-3xl">Create Account</h1>

      {/* - - - - - - - - - - - */}
        <form onSubmit={onSubmit} action="/register" method="POST" 
        className="flex flex-col shadow-2xl rounded-2xl bg-white">

          <label htmlFor="employee-name" 
          className="font-mono antialiased 
        text-gray-600 text-center text-base py-3">Name</label>
          <input type="text" id="employee-name" 
          className="
          peer bg-transparent text-blue-gray-700 font-mono antialiased outline 
          outline-0 focus:outline-0 disabled:bg-blue-gray-50 
          disabled:border-0 transition-all placeholder-shown:border 
          placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
          border focus:border-2 border-t-transparent focus:border-t-transparent 
          text-base px-3 rounded-[7px] border-blue-gray-200 focus:border-y-white mx-10"
          name="employeeName" 
          value={employeeName}
          onBlur={onInputBlur}
          onChange={onInputChange}
          autoComplete="off"
          required
          placeholder="username"/>

          {error.employeeName && 
            <p className="border border-red-400 rounded-md bg-red-100 px-1
            mx-10 
            text-center
            text-red-700">
              {error.employeeName}
            </p>
          }

          <br />
        
          <label htmlFor="employee-email" className="font-mono antialiased 
          text-gray-600 text-center text-base">Email </label>
          <input type="email" id="employee-email" 
          className="
          peer bg-transparent text-blue-gray-700 font-mono antialiased outline 
          outline-0 focus:outline-0 disabled:bg-blue-gray-50 
          disabled:border-0 transition-all placeholder-shown:border 
          placeholder-shown:border-blue-gray-200 
          placeholder-shown:border-t-blue-gray-200 border focus:border-2 
          border-t-transparent focus:border-t-transparent 
          text-base px-3 rounded-[7px] border-blue-gray-200 focus:border-y-white mx-10" 
          name="employeeEmail"
          value={employeeEmail}
          onBlur={onInputBlur}
          onChange={onInputChange}
          autoComplete="off"
          placeholder="example@email.com"/>

          {error.employeeEmail && 
            <p className="border border-red-400 rounded-md bg-red-100 px-1 
            mx-10 
            text-center
            text-red-700">
              {error.employeeEmail}
            </p>
          }
        
          <br />
        
          <label htmlFor="employee-age" className="font-mono antialiased text-gray-600 text-center text-base">Age </label>
          <input type="number" id="employee-age" className="
          peer bg-transparent text-blue-gray-700 font-mono antialiased outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-base px-3 rounded-[7px] border-blue-gray-200 focus:border-y-white mx-10" 
          name="employeeAge"
          value={employeeAge}
          onBlur={onInputBlur}
          onChange={onInputChange} 
          autoComplete="off"
          
          placeholder="18+"/>

          {error.employeeAge && 
            <p className="border border-red-400 rounded-md bg-red-100 px-1 
            mx-10 
            text-center
            text-red-700">
              {error.employeeAge}
            </p>
          }

          <br />
        
          <label htmlFor="employee-password"
          className="font-mono antialiased text-gray-600 text-center 
          text-base">Password</label>
          <input type="password" id="employee-password" 
          className="
          peer bg-transparent text-blue-gray-700 font-mono antialiased 
          outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0
          transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 
          placeholder-shown:border-t-blue-gray-200 border focus:border-2 
          border-t-transparent focus:border-t-transparent text-sm px-3 rounded-[7px] 
          border-blue-gray-200 focus:border-y-white mx-10"
          name="employeePassword" 
          value={employeePassword}
          onBlur={onInputBlur}
          onChange={onInputChange}
          autoComplete="off"
          
          placeholder="******"/>

          {error.employeePassword && 
            <p className="border border-red-400 rounded-md bg-red-100 px-1 
            mx-10 
            text-center
            text-red-700">
              {error.employeePassword}
            </p>
          }

          <br />
        
          <div className="mx-5 py-3">

            <label htmlFor="authority" className="text-base px-1 font-mono 
            antialiased text-gray-600 text-center">Authority: </label>

            <label htmlFor="ADMIN" className="text-base px-1 font-mono 
            antialiased text-gray-600 text-center">ADMIN</label>
            <input type="radio" id="ADMIN" 
            className="accent-blue-500/25" 
            name="employeeAuthority" 
            onChange={onInputChange}
            defaultChecked={employeeAuthority === "ADMIN"}
            value="ADMIN"/>

            <label htmlFor="EMPLOYEE" className="text-base px-1 
            font-mono antialiased text-gray-600 text-center">EMPLOYEE</label>
            <input type="radio" id="EMPLOYEE" 
            className="accent-blue-500/25"
            name="employeeAuthority"
            onChange={onInputChange} 
            defaultChecked={employeeAuthority === "EMPLOYEE"}
            value="EMPLOYEE"/>

          </div>

          {error.employeeAuthority ? 
            <p className="border border-red-400 rounded-md bg-red-100 px-1 
            mx-10 
            text-center
            text-red-700">
              {error.employeeAuthority}
            </p> 
            : null
          }
        
          <br />

          <div className="flex justify-around">

            <button type="reset" 
            value="Reset" 
            onClick={onResetForm}
            className="px-6 py-2 font-semibold rounded-lg
            bg-blue-500 shadow-lg shadow-blue-500/50 	
            text-white">Reset</button>

            <button type="submit" value="Submit"
            className="px-6 font-semibold 
            rounded-lg bg-blue-500 shadow-lg shadow-blue-500/50 	
          text-white">Create</button>
            
            <button type="button" 
            value="Submit" 
            onClick={handleLoginClick}
            className="px-6 font-semibold rounded-lg 
            bg-blue-500 shadow-lg shadow-blue-500/50 
            text-white">Login</button> 

          </div>

          <br />
          
        </form>
      </div>
    </div>
  )
}

export default CreateAccount;