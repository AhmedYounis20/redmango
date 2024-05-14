import React, { useState } from 'react'
import { UserLoginModel, authApiResponse, userModel } from '../Interfaces';
import { inputHelper } from '../Helper';
import { useLoginMutation } from '../Apis/authApi';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { RootState } from '../Storage/Redux/store';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [loginRequest] = useLoginMutation();
  const dispatch = useDispatch();
  const navigator  =  useNavigate();
  const userData = useSelector((state:RootState)=> state.userAuthStore);
  const [loading,setLoading] = useState<Boolean>(false);
  const [errors, setErrors] = useState<Array<string>>([]); 
  const [userInput,setUserInput] = useState<UserLoginModel>({
    username:"",
    password:""
  });
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    setLoading(true);
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
    setLoading(false);
  }
  const handleSubmit  = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    let response : authApiResponse = await loginRequest(userInput);
    if(response.data){
      console.log(response.data);
      const {token} = response.data.result;
      const userdata : userModel = jwtDecode(token);
      dispatch(setLoggedInUser(userdata));
      console.log(userData);
      navigator('/');
      localStorage.setItem("token",token);
      
    }
    else if(response.error){
      setErrors(response.error.data.errorMessages);
      console.log(response.error.data.errorMessages);
    }

    setLoading(false);
  }
  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="username"
              onChange={handleUserInput}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              onChange={handleUserInput}
            />
          </div>
        </div>
        <ul>
          {errors.map((error, key) => 
            (<li className='text-danger' key={key}> {error}</li>)
          )}
        </ul>
        <div className="mt-5">
          <button
            type="submit"
            className={`btn ${
              loading ? "btn-secondary disabled" : "btn-success"
            }`}
          >
            {!loading ? "Login" : "wait while login ..."}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login
