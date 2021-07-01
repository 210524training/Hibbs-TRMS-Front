import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Reimbursement from '../../../models/Reimbursement'
//import './Reimbursement.css'
import { deleteReimbursement } from '../../../remote/TRMS-backend/TRMS.api';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../slices/user.slice';
import trmsClient from '../../../remote/TRMS-backend/TRMS.client';
const makebencowork="ApprovedByDepartmentHead";
type Props = {
  requests: Reimbursement[];
  setSelected: Dispatch<SetStateAction<string | undefined>>;
}

const ReimbursementComponent: React.FC<Props> = ({requests, setSelected}) => {
    const[ID, setID] = useState<string>('');
    const[status,setStatus]=useState<string>('');
    const[ObjType,setObjType]=useState<string>("Reimbursement");
    
    
    const history = useHistory();
    const user = useAppSelector<UserState>(selectUser);
    let job;
    if(!user){
      job=null;
    }else{
      job=user.ObjType;
    }
    let approveStatus="Pending";
    if(job==="Employee"){
      approveStatus="Pending";
    }else if(job==="Supervisor"){
      approveStatus="ApprovedBySupervisor";
    }else if(job==="Department Head"){
      approveStatus=makebencowork;
    }else if(job==="Benefits Controller"){
      approveStatus="Awarded";
    }else{approveStatus="Pending"}

    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
    };
    const handleStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setStatus(e.target.value);
    };
   
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await trmsClient.patch<boolean>('/api/v1/reimbursement/patch', {
            ID,
            status,
        });

        
        history.push('/');
    }
    const handleDeleteSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      deleteReimbursement(ID);

      
      history.push('/');
  }
    
    
  return (
    <>{ user && user.ObjType === 'Employee' ? (
        <>
        { requests.map(element => (
        <div className="card listItem" id={element.ID} key={element.ID}  onClick={(event) => setSelected(event.currentTarget.id)}>
          <div>Reimbursement ID: {`${element.ID} `}</div>
          <div>Employee: {`${element.username} `}</div>
          <div>Date: {`${element.Date} `}</div>
          <div>Cost: {`${element.cost} `}</div>
          <div>Estimated amount: {`${element.expectedAmount} `}</div>
          <div>Type: {`${element.eventType} `}</div>
          <div>Status: {`${element.status} `}</div>
          <div>Grade: {`${element.grade} `}</div>
          <div>Description: {`${element.description} `}</div>
          <div>Grade Format: {`${element.gradeFormat} `}</div>
          <div>Passing Grade: {`${element.passingGrade} `}</div>
          <div>
            <form onSubmit={handleDeleteSubmit} >
            <input type="text" className="form-control" id="idInput" placeholder="Please enter Reimbursement ID to reject"
              onChange={handleIdChange} />
            <input type="submit" className="btn btn-danger" value='Delete Request' />
            </form>
          </div>
        </div>
      ))}  
        </>
    ): (<>
        { requests.map(element => (
        <div className="card listItem" id={element.ID} key={element.ID}  onClick={(event) => setSelected(event.currentTarget.id)}>
          <div>Reimbursement ID: {`${element.ID} `}</div>
          <div>Employee: {`${element.username} `}</div>
          <div>Date: {`${element.Date} `}</div>
          <div>Cost: {`${element.cost} `}</div>
          <div>Estimated amount: {`${element.expectedAmount} `}</div>
          <div>Type: {`${element.eventType} `}</div>
          <div>Status: {`${element.status} `}</div>
          <div>Grade: {`${element.grade} `}</div>
          <div>Description: {`${element.description} `}</div>
          <div>Grade Format: {`${element.gradeFormat} `}</div>
          <div>Passing Grade: {`${element.passingGrade} `}</div>
          <div>
          <label htmlFor="idInput" className="form-label"></label>
            <form onSubmit={handleSubmit} >
                <div>
                    <div>
                      <label>Please Confirm the ID of the request you're reviewing:</label>
                        <input type="text" className="form-control" id="idInput" placeholder="Reimbursement ID"
                    onChange={handleIdChange} required/>
                    </div>
                    <div>
                    <label>Approve?</label>
                    <br></br>
                    <label>Accept:</label>
                    <input type="radio" value={approveStatus} name="approval" onChange={handleStatusChange} required/>
                    <label>     Reject:</label>
                    <input type="radio" value="Rejected" name="approval" onChange={handleStatusChange} required/>
                    </div>
                    <input type="submit" className="btn btn-success" value='Submit Decision' />
                </div>
            </form>
          </div>
          
        </div>
      ))} 
        </>)} 
        
     </>
  )
};

export default ReimbursementComponent;