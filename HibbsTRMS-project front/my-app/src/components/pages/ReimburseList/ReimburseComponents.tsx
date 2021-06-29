import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Reimbursement from '../../../models/Reimbursement'
//import './Reimbursement.css'
import { deleteReimbursement } from '../../../remote/TRMS-backend/TRMS.api';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../slices/user.slice';
import trmsClient from '../../../remote/TRMS-backend/TRMS.client';

type Props = {
  requests: Reimbursement[];
  setSelected: Dispatch<SetStateAction<string | undefined>>;
}

const ReimbursementComponent: React.FC<Props> = ({requests, setSelected}) => {
    const[id, setId] = useState<string>('');
    const [amount, setAmount] = useState<number>()
    const [message, setMessage] = useState<string>();
    const history = useHistory();
    const user = useAppSelector<UserState>(selectUser);

    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    }
    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.valueAsNumber);
    }
    const handleMsgChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        await deleteReimbursement(id);
    
        history.push('/');
    }
    const handleApproveSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await trmsClient.put<boolean>('/api/v1/reimbursements', {
            id,
            amount,
        });

        console.log(response.data);
        history.push('/');
    }
    const handleRejectSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await trmsClient.patch<boolean>('/api/v1/reimbursements', {
            id,
            message,
        });

        console.log(response.data);
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
          <div>Estimated amount: {`${element.expectedAmmount} `}</div>
          <div>Type: {`${element.eventType} `}</div>
          <div>Status: {`${element.status} `}</div>
          <div>Grade: {`${element.grade} `}</div>
          <div>Description: {`${element.description} `}</div>
          <div>Grade Format: {`${element.gradeFormat} `}</div>
          <div>Passing Grade: {`${element.passingGrade} `}</div>
          <div>
            <form onSubmit={handleFormSubmit} >
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
          <div>Estimated amount: {`${element.expectedAmmount} `}</div>
          <div>Type: {`${element.eventType} `}</div>
          <div>Status: {`${element.status} `}</div>
          <div>Grade: {`${element.grade} `}</div>
          <div>Description: {`${element.description} `}</div>
          <div>Grade Format: {`${element.gradeFormat} `}</div>
          <div>Passing Grade: {`${element.passingGrade} `}</div>
          <div>
          <label htmlFor="idInput" className="form-label"></label>
            <form onSubmit={handleApproveSubmit} >
                <div>
                    <div>
                        <input type="text" className="form-control" id="idInput" placeholder="Reimbursement ID"
                    onChange={handleIdChange} />
                    </div>
                    <div>
                        <input type="text" className="form-control" id="amountInput" placeholder="Amount"
                        onChange={handleAmountChange} />
                    </div>
                    <input type="submit" className="btn btn-success" value='Approve Request' />
                </div>
            </form>
          </div>
          <div>  
          <form onSubmit={handleRejectSubmit} >
                <div>
                    <div>
                        <input type="text" className="form-control" id="idInput" placeholder="Reimbursement ID"
                    onChange={handleIdChange} />
                    </div>
                    <div>
                        <input type="text" className="form-control" id="idInput" placeholder="Please enter a reason for your rejeciton."
                    onChange={handleMsgChange} />
                    </div>
                    <input type="submit" className="btn btn-danger" value='Reject Request' />
                </div>
            </form>
          </div>
        </div>
      ))} 
        </>)} 
        
     </>
  )
}

export default ReimbursementComponent;