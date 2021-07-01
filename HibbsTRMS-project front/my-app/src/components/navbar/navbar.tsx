import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
//import './Navbar.css'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout, selectUser, UserState } from '../../slices/user.slice';
import '../../style.css';

type Props = {
}

const Navbar: React.FC<Props> = (props) => {

  const history = useHistory();
  const dispatch = useAppDispatch();
  // We "Select" the User data from the state
  const user = useAppSelector<UserState>(selectUser);

  const handleLogout = () => {
    dispatch(logout());

    history.push('/');
  }

  return (
    <nav className="form">
      <div id="nav" className="container-fluid">
        <NavLink className="navbar-brand" to="/">Home</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            { user && user.ObjType === 'Employee' ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/reimbursements">My Reimbursements</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/addReimbursement">Create a New Reimbursement</NavLink>
                </li>
              </>
              ) : (
                <>
                </>
              )
            }
            { user && user.ObjType !== 'Employee' ? (
              <>
                 <li className="nav-item">
                  <NavLink className="nav-link" to="/reimbursements">View Reimbursements</NavLink>
                </li>
              </>
              ) : (
                <>
                </>
              )
            }
          </ul>
          <ul className="navbar-nav ms-auto">
            { !user ? (
              <>
                <li className="form button">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              </>
              ) : (
              <li className="nav-item">
                <input type='submit' onClick={handleLogout} value='Logout' />
              </li>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;