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
  
  //console.log(user);
  //console.log(JSON.stringify(user));
  //console.log(typeof user);
  //console.log(Object.keys(user));
  //console.log(Object.getOwnPropertyNames(user));
  //console.log(user.ObjType);
  
}

export const getReimbursements = async(): Promise<Reimbursement[]> => {
  const result = await trmsClient.get<Reimbursement[]>('/api/v1/reimbursement/getall');
  //console.log(result.data);
  return result.data;
}
export const getEmployeeReimbursements = async(username: string): Promise<Reimbursement[]> => {
  const result = await trmsClient.get<Reimbursement[]>(`/api/v1/reimbursement/user/${username}`);
  console.log(result);
  return result.data;
}//   /api/v1/reimbursement?username=${username}
//    /api/vi/reimbursement/:${username}
export const deleteReimbursement = async(id: string): Promise<void> => {
  console.log('API id: ', id);
  await trmsClient.delete<boolean>(`/api/v1/reimbursement/:${id}`);
}
