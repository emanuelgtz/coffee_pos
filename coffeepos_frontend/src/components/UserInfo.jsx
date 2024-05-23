import { useEffect, useState } from 'react';
import svg from '../assets/arrowBack.png';
import { useContext } from 'react';
import { Context } from '../context/Context';
import { Navigate, useNavigate } from 'react-router-dom';

function UserInfo() {

  const navigate = useNavigate();

  const { user } = useContext(Context);

  const handleBack = () => {
    navigate('/login/homepage')
  }

  

  return (
    <div className="h-dvh w-dvw 
    bg-gradient-to-r from-blue-400 to-cyan-500">

      <div className="flex p-5">
        <div 
        onClick={handleBack}
        className="content-center shadow-2xl cursor-pointer
        rounded-2xl bg-white w-10 h-10">
          <img src={svg} alt="arrow back" />
        </div>
      </div>

      <div className="flex justify-center my-28">

        <div className="shadow-2xl rounded-2xl border-2 
        bg-white content-center">
          <h2 className="text-center text-2xl py-2 font-mono">User data</h2>
          {user && (

            <>
              <p className="py-4 px-3 text-lg font-mono">
                <b>Employee Name</b>: {user.employeeName || 'N/A'}
              </p>

              <p className="py-4 px-3 text-lg font-mono">
                <b>Employee Email</b>: {user.employeeEmail}
              </p>

              <p className="py-4 px-3 text-lg font-mono">
                <b>Employee Age</b>: {user.employeeAge || 'N/A'}
              </p>
              <p className="py-4 px-3 text-lg font-mono">
                <b>Employee Authority</b>:
                {user.employeeAuthority || 'N/A'}
              </p>
            </>

          )}
        </div>

      </div>

    </div>
  )
};

export default UserInfo;