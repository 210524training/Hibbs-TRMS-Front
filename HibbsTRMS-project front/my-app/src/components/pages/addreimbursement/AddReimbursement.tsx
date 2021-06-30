import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
//import './AddReimbursement.css';
import trmsClient from '../../../remote/TRMS-backend/TRMS.client';
import {v4} from 'uuid';
//import { useSelector } from 'react-redux';
import store from '../../../store';

var reader = new FileReader();


const AddReimbursementPage: React.FC<unknown> = (props)=> {
  const history = useHistory();
  const[ObjType,setObjType]=useState<string>();
  const[username,setUserName]=useState<string>();
  const[realName,setRealName]=useState<string>();
  const[ID,setID]=useState<string>();
  const[cost,setCost]=useState<number>();
  const[status,setStatus]=useState<string>();
  const[eventType,setEventType]=useState<string>();
  const[reimbursePortion,setReimbursePortion]=useState<number>();
  const[expectedAmmount,setExpectedAmmount]=useState<number>();
  const[Date,setDate]=useState<string>();
  const[description,setDescription]=useState<string>();
  const[grade,setGrade]=useState<string>();
  const[gradeFormat,setGradeFormat]=useState<string>();
  const[passingGrade,setPassingGrade]=useState<string>();
  const[presentationSubmission,setPresentationSubmission]=useState<File>();
  
  
 /*
  const handleObjTypeChange=(e: ChangeEvent<HTMLInputElement>)=>{
    setObjType(e.target.value);
  };
  const handleusernameChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setUserName(e.target.value);
  };
  const handleIDChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setID(e.target.value);
  };
  */
  const handleCostChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setCost(parseInt(e.target.value));
  };
  const handleStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setStatus(e.target.value);
  };
  const handleTypeChange=(e:ChangeEvent<HTMLSelectElement>)=>{
    let event=e.target.value;
    setEventType(event);
    
    };

    useEffect(() => {
      setReimbursePortion(()=>{
        if(eventType==="University Course") {
          return 0.8;
        }else if(eventType==="Seminar") {
          return 0.6;
        }else if(eventType==="Certification") {
          return 1;
        }else if(eventType==="Cert Prep") {
          return 0.75;
        }else if(eventType==="Technical Training") {
          return 0.9;
        }else if(eventType==="Other") {
          return 0.3;
        }else{
          return 0;
        }
      });
          
      
      
    }, [eventType]);

    useEffect(()=>{
      setExpectedAmmount(() => {
        if(!cost||!reimbursePortion){
          return 0
        }else{
          return cost*reimbursePortion
        };
      });
    },[reimbursePortion,cost]);
    
    useEffect(()=>{
      setObjType('Reimbursement');
    },[cost]);

    useEffect(()=>{
      setStatus('Pending');
    },[cost]);

    useEffect(()=>{
      setID(v4());
    },[cost]);

    useEffect(()=>{
      setUserName(store.getState().user?.username);
    },[cost]);

    useEffect(()=>{
      setRealName(store.getState().user?.RealName);
    },[cost]);
    

    
  //console.log(store.getState())
  //useSelector(store)
    /*
    setObjType('Reimbursement');
    setStatus("Pending");
    setID(v4());
    */
    
    /*handleTypeChange(e) {
	setType(e.target.value)


useEffect( () => {
	// set adjusted amount
}, [type]*/

  
  /*
  const handleReimbursePortionChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setReimbursePortion(e.target.value);
  };
  const handleExpectedAmmountChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setExpectedAmmount(e.target.value);
  };
  */
  const handleDateChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setDate(e.target.value);
  };
  const handleDescriptionChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setDescription(e.target.value);
  };
  const handleGradeChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setGrade(e.target.value);
  };
  const handleGradeFormatChange=(e:ChangeEvent<HTMLSelectElement>)=>{
    setGradeFormat(e.target.value);
  };
  const handlePassingGradeChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setPassingGrade(e.target.value);
  };
  const hanlePresentationSubmissionChange=(e:ChangeEvent<HTMLInputElement>)=>{
    if (!e.target.files) return;
    setPresentationSubmission(e.target.files[0]);

  };
    
    
    
    /*let file;
    setPresentationSubmission(()=>{
      if(e.target.files![0]!==null){
        return e.target.files![0];
      }else{
        return file=require('./dumm.txt');
      };
    });*/
  

  /*useEffect(()=>{

  })*/
  

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (presentationSubmission) {
      let formData;
      reader.readAsDataURL(presentationSubmission);
      reader.onload = async function () {
         formData = reader.result;
         const response = await trmsClient.post<boolean>('/api/v1/reimbursement/addReimbursement', {
          ObjType,
          username,
          realName,
          ID,
          cost,
          status,
          eventType,
          reimbursePortion,
          expectedAmmount,
          Date,
          description,
          grade,
          gradeFormat,
          passingGrade,
          presentationSubmission,
        });
         console.log('FILE IS SENT: ')
      };
    }

    // Send an Axios Request
    console.log(presentationSubmission)
    

    history.push('/');
  }

  //console.log('location: ', location);
  //console.log('description: ', description);
  //console.log('cost: ', cost);
  //console.log('reimbursementCategory: ', reimbursementCategory);

  return (
    <div className='container' id='register-form'>
        <h2>Good luck getting paid</h2>
        <form onSubmit={handleFormSubmit} >
          <div className="mb-3">
            <p>Note only tuition costs are reimbursed. Exclude books and other related costs.</p>
          <label htmlFor="CostInput" className="form-label" >Cost</label>
          <input type="number" className="form-control" id="CostInput"
            onChange={handleCostChange} required/>
        </div>
          <div className="mb-3">
          <label htmlFor="DateInput" className="form-label">Date</label>
          <input type="datetime-local" className="form-control" id="DateInput"
            onChange={handleDateChange} required/>
        </div>
          <div className="mb-3">
          <label htmlFor="DescriptionInput" className="form-label">Description</label>
          <input type="text" className="form-control" id="DescriptionInput"
            onChange={handleDescriptionChange} required/>
        </div>
          <div className="mb-3">
          <label htmlFor="EventTypeInput" className="form-label">Education Type</label>
          {/* <input type="text" className="form-control" onChange={handlereimbursementCategoryChange} /> */}
          <select id="EventTypeInput" className="form-control" onChange={handleTypeChange} required>
             {/* export type Category = 'University Course' | 'Seminar' | 'Certification Preparation Class' | 'Certification' | 'Technical Training' | 'Other';   */}
             <option value="none" selected disabled hidden>Choose an option</option>
             <option value="University Course">University Course</option>
             <option value="Seminar">Seminar</option>
             <option value="Cert Prep">Certification Preparation Class</option>
             <option value="Certification">Certification</option>
             <option value="Technical Training">Technical Training</option>
             <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="GradeFormatInput" className="form-label">Grade Format</label>
          {/* <input type="text" className="form-control" onChange={handlereimbursementCategoryChange} /> */}
          <select id="GradeFormatInput" className="form-control" onChange={handleGradeFormatChange} required>
             {/* export type Category = 'University Course' | 'Seminar' | 'Certification Preparation Class' | 'Certification' | 'Technical Training' | 'Other';   */}
             <option value="none" selected disabled hidden>Choose an option</option>
             <option value="letter">Letter Grade</option>
             <option value="percent">Percentage</option>
             <option value="pass/fail">Pass/Fail</option>
             <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="PassingGradeInput" className="form-label">Passing Grade</label>
          <input type="text" className="form-control" id="PassingGradeInput"
            onChange={handlePassingGradeChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="gradeInput" className="form-label">Grade</label>
          <input type="text" className="form-control" id="gradeInput"
            onChange={handleGradeChange} required/>
        </div>
        <div>
          <label htmlFor="fileInput" className="form-label">Submit file</label>
          <input type="file" className="form-control" id="fileInput" onChange={hanlePresentationSubmissionChange}/>
        </div>
          <input type="submit" className="btn btn-primary" value='Create new request' />
        </form>
    </div>
  );
};

export default AddReimbursementPage;