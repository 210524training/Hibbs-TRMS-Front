import React, { useEffect, useState } from 'react';
import Reimbursement from '../../../models/Reimbursement'
import { getReimbursements, getEmployeeReimbursements } from '../../../remote/TRMS-backend/TRMS.api';
import ReimbursementsComponent from './ReimburseComponents';
import {  useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../slices/user.slice';

const ReimbursementsPage: React.FC<unknown> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selected, setSelected] = useState<string>();
    const [requests, setRequests] = useState<Reimbursement[]>();
    const user = useAppSelector<UserState>(selectUser);
    //console.log(props)
    useEffect(() => {
        if(user && user.ObjType === 'Employee') {
          (async () => { 
            const result = await getEmployeeReimbursements(user.username);
            setRequests(result); 
            console.log('Results: '+result);
            //console.log(requests);
            console.log('Requests: '+requests);
          })();
        } else {
          (async () => { 
            const result = await getReimbursements();
            setRequests(result); 
            console.log("Results: "+result);
            //console.log(requests);
            console.log('Requests: '+requests);
          })();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return (
      <>
        {requests 
        ? <ReimbursementsComponent requests={requests} setSelected={setSelected}/>
        :<></>
        }
      </>
    )
  };

  export default ReimbursementsPage;