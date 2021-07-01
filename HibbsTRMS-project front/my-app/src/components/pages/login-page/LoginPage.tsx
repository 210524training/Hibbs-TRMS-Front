import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { loginAsync } from '../../../slices/user.slice';

const LoginPage: React.FC<unknown> = (props) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [job,setJob]=useState<string>('');

  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleJobChange=async(e:ChangeEvent<HTMLInputElement>)=>{
    setJob(e.target.value);
    console.log(e.target.value)
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(loginAsync({username, password,job}));

    history.push('/');
  };
  

  return (
    <div className='container' id='register-form'>
      <form onSubmit={handleFormSubmit} >
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="usernameInput"
            onChange={handleUsernameChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordInput"
            onChange={handlePasswordChange} required/>
        </div>
        <div>
          <label>job</label>
          <br></br>
          <label>Employee:</label>
          <input type="radio" value="Employee" name="job" onChange={handleJobChange} required/>
          <br></br>
          <label>  Supervisor:</label>
          <input type="radio" value="Supervisor" name="job" onChange={handleJobChange} required/>
          <br></br>
          <label>  Department Head:</label>
          <input type="radio" value="Department Head" name="job" onChange={handleJobChange} required/>
          <br></br>
          <label>  Benefits Controller:</label>
          <input type="radio" value="Benefits Controller" name="job"onChange={handleJobChange} required/>
          
        </div>
        <input type="submit" className="btn btn-primary" value='Submit' />
      </form>
    </div>
  );
};

export default LoginPage;