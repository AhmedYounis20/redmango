import React,{useState} from 'react'
import { SD_Roles } from '../Utility/SD';
import { ApiResponse, UserRegisterModel, authApiResponse } from '../Interfaces';
import { inputHelper } from '../Helper';
import { useRegisterMutation } from '../Apis/authApi';

const Register = () => {
    const [registerUser] = useRegisterMutation();
    const[loading,setLoading] =useState<Boolean>(false);
    const [userInput,setUserInput] = useState<UserRegisterModel>({
        name:"",
        username:"",
        password:"",
        role:""
    });

    const handleUserInput = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const tempData = inputHelper(e,userInput);
        setUserInput(tempData);
    }
    const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        const response : authApiResponse = await registerUser(userInput);
        if(response.data){
            console.log(response);
        }
        else {
            console.log(response.error.data.errorMessages[0]);
        }

    }
  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={userInput?.name}
              onChange={handleUserInput}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="username"
              value={userInput?.username}
              onChange={handleUserInput}
              autoComplete="username"
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
              value={userInput?.password}
              onChange={handleUserInput}
              autoComplete={"current-password"}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              required
              name="role"
              value={userInput?.role}
              onChange={handleUserInput}
            >
              <option value={" "}> --- Select Role ---</option>
              <option value={`${SD_Roles.ADMIN}`}> Admin</option>
              <option value={`${SD_Roles.CUSTOMER}`}> Customer</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register
