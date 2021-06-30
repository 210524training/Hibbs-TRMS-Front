import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../components/pages/home-page/HomePage';
import ReimbursementsPage from '../components/pages/ReimburseList/ReimbursementPage';
import AddReimbursementPage from '../components/pages/addreimbursement/AddReimbursement';
import LoginPage from '../components/pages/login-page/LoginPage';

const AppRoutes: React.FC<unknown> = (props) => {

  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/reimbursements'>
        {/*console.log(props.children)*/}
        <ReimbursementsPage/>
      </Route>
      <Route exact path='/AddReimbursement'>
        {/*console.log(props.children)*/}
        <AddReimbursementPage />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default AppRoutes;