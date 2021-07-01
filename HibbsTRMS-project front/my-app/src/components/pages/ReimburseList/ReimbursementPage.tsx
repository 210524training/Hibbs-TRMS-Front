import React, { useEffect, useState } from 'react';
import Reimbursement from '../../../models/Reimbursement'
import { getReimbursementsByStatus, getEmployeeReimbursements } from '../../../remote/TRMS-backend/TRMS.api';
import ReimbursementsComponent from './ReimburseComponents';
import {  useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../slices/user.slice';

const makebencowork="ApprovedByDepartmentHead";
const ReimbursementsPage: React.FC<unknown> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selected, setSelected] = useState<string>();
    const [requests, setRequests] = useState<Reimbursement[]>();
    const user = useAppSelector<UserState>(selectUser);
    
    useEffect(() => {
        if(user && user.ObjType === 'Employee') {
          (async () => { 
            const result = await getEmployeeReimbursements(user.username);
            console.log(result);
            setRequests(result); 
            
          })();
        } else if(user && user.ObjType==='Supervisor'){
          (async () => { 
            const result = await getReimbursementsByStatus('Pending');
            setRequests(result); 
            
          })();
        }else if(user &&user.ObjType==='Department Head'){
          (async()=>{
            const result=await getReimbursementsByStatus('ApprovedBySupervisor');
            setRequests(result);
          })();
        }else if(user&& user.ObjType==="Benefits Controller"){
          console.log(user.ObjType);
          (async()=>{
            const result=await getReimbursementsByStatus(makebencowork);
            console.log(result);
            setRequests(result);
          })();
        }//"ApprovedByDeparmentHead"
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