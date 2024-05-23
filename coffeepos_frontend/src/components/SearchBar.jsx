import {useContext, useState } from "react";

import userImage from '../assets/user.png';
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

function SearchBar() {

  const navigate = useNavigate();

  const [value, setValue] = useState('');

  const {data, setData} = useContext(Context);

  const inputChange = (event) => {
    setValue(event.target.value); 
    setData(event.target.value);
  }

  const handleUserInfo = () => {
    navigate('/login/userinfo');
  }

  return(
    <div className="flex place-content-between">
      <input className="w-full p-2 my-2 rounded-xl border-2 border-blue-200"
        type="text" 
        placeholder="Product search..."
        onChange={inputChange}
        value={value}
      />
      

      <div className="flex justify-center 
      items-center
      mx-8 rounded-lg cursor-pointer" 
      onClick={handleUserInfo}>
        
        <div className="mx-1">
          <img src={userImage} alt="" className="w-16" />
        </div>
        
        <div className="text-xl font-sans w-full">
          <h1>user</h1>
        </div>
      
      </div> 
    
    </div>
  )
}

export default SearchBar;