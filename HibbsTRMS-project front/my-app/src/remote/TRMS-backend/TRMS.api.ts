import User from "../../models/user";
import trmsClient from "./TRMS.client";
import Reimbursement from "../../models/Reimbursement";

export const sendLogin = async (username: string, password: string,job:string): Promise<User> => {
  
  if(job==="Employee"){
    const {data: user} = await trmsClient.post<User>('/EmployeeLogin', {
      username,
      password,
    });
    return user;
  }else if(job==="Supervisor"){
    const {data: user} = await trmsClient.post<User>('/supervisorLogin', {
      username,
      password,
    });
    return user;
  }else if(job==="Department Head"){
    const {data: user} = await trmsClient.post<User>('/departmentHeadLogin', {
      username,
      password,
    });
    return user;
  }else if(job==="Benefits Controller"){
    const {data: user} = await trmsClient.post<User>('/benCologin', {
      username,
      password,
    });
    return user;
  }else{
    console.log("get a job!")
    const {data: user}= await trmsClient.post<User>('');
    return user;
  }
  
}

export const getReimbursements = async(): Promise<Reimbursement[]> => {
  const result = await trmsClient.get<Reimbursement[]>('/api/v1/reimbursement/getall');
  
  return result.data;
}
export const getReimbursementsByStatus = async(status:string): Promise<Reimbursement[]> => {
  const result = await trmsClient.get<Reimbursement[]>(`/api/v1/reimbursement/status/${status}`);
  console.log(result.data);
  
  return result.data;
}
export const getEmployeeReimbursements = async(username: string): Promise<Reimbursement[]> => {
  const result = await trmsClient.get<Reimbursement[]>(`/api/v1/reimbursement/user/${username}`);
  console.log(result.data);
  return result.data;
}
export const deleteReimbursement = async(ID: string): Promise<void> => {
  await trmsClient.delete<boolean>(`/api/v1/reimbursement/${ID}`);
}
