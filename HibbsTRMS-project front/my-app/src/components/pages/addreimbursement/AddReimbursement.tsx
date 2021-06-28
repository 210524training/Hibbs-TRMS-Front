import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
//import './AddReimbursement.css';
import trmsClient from '../../../remote/TRMS-backend/TRMS.client';

const AddReimbursementPage: React.FC<unknown> = (props)=> {
  const history = useHistory();
  const [location, setLocation] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [cost, setCost] = useState<number>();
  const [reimbursementCategory, setreimbursementCategory] = useState<string>();
  const [grade, setGrade] = useState<string>();
  console.log(props)
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCost(e.target.valueAsNumber);
  };

  const handlereimbursementCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setreimbursementCategory(e.target.value);
  };
  
  const handleGradeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGrade(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send an Axios Request

    const response = await trmsClient.post<boolean>('/api/v1/reimbursement', {
      location,
      description,
      cost,
      reimbursementCategory,
      grade,
    });

    console.log(response.data);
    history.push('/');
  }

  console.log('location: ', location);
  console.log('description: ', description);
  console.log('cost: ', cost);
  console.log('reimbursementCategory: ', reimbursementCategory);

  return (
    <div className='container' id='register-form'>
        <h2>So, you're a racing driver, huh?</h2>
        <form onSubmit={handleFormSubmit} >
          <div className="mb-3">
          <label htmlFor="locationInput" className="form-label">Location</label>
          <input type="text" className="form-control" id="locationInput"
            onChange={handleLocationChange} />
        </div>
          <div className="mb-3">
          <label htmlFor="descriptionInput" className="form-label">Description</label>
          <input type="text" className="form-control" id="descriptionInput"
            onChange={handleDescriptionChange} />
        </div>
          <div className="mb-3">
          <label htmlFor="costInput" className="form-label">Cost</label>
          <input type="number" className="form-control" id="costInput"
            onChange={handleCostChange} />
        </div>
          <div className="mb-3">
          <label htmlFor="reimbursementCategoryInput" className="form-label">Category</label>
          {/* <input type="text" className="form-control" onChange={handlereimbursementCategoryChange} /> */}
          <select id="requestIdInput" className="form-control" onChange={handlereimbursementCategoryChange}>
             {/* export type Category = 'University Course' | 'Seminar' | 'Certification Preparation Class' | 'Certification' | 'Technical Training' | 'Other';   */}   
             <option value="University Course">University Course</option>
             <option value="Seminar">Seminar</option>
             <option value="Certification Preparation Class">Certification Preparation Class</option>
             <option value="Certification">Certification</option>
             <option value="Technical Training">Technical Training</option>
             <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="gradeInput" className="form-label">Grade (link to video or file)</label>
          <input type="text" className="form-control" id="gradeInput"
            onChange={handleGradeChange} />
        </div>
          <input type="submit" className="btn btn-primary" value='Create new request' />
        </form>
    </div>
  );
};

export default AddReimbursementPage;