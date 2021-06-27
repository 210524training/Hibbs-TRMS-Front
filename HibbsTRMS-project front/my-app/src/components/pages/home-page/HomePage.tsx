import React from 'react';
//import './HomePage.css';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../slices/user.slice';

type Props = {
}

const HomePage: React.FC<Props> = (props) => {
  const user = useAppSelector<UserState>(selectUser);

  return (
    <>
      <div className="banner">
        <div>
          <h1 className='whiteText'>Get paid for getting educated!</h1><br/>
        </div>
        <br/>
        <h2 className='whiteText'></h2>
        <h2 className='whiteText'></h2>
        <h3 className='whiteText'></h3>
        <br/>
        { user && <p className='whiteText'>Greetings {user.username}</p>}
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
           
          </div>
          <div className="col-sm-4">
            
          </div>       
          <div className="col-sm-4">
            
          </div>
        </div>
      </div>
      <div className="footer">
      </div>
    </>
  );
};

export default HomePage;