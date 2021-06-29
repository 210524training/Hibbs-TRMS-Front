import User from "../../models/user";
import trmsClient from "./TRMS.client";
import Reimbursement from "../../models/Reimbursement";

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await trmsClient.post<User>('/EmployeeLogin', {
    username,
    password,
  });
  //console.log(user);
  //console.log(JSON.stringify(user));
  //console.log(typeof user);
  //console.log(Object.keys(user));
  //console.log(Object.getOwnPropertyNames(user));
  //console.log(user.ObjType);
  return user;
}

export const getReimbursements = async(): Promise<Reimbursement[]> => {
  const result = await trmsClient.get<Reimbursement[]>('/api/v1/reimbursement');
  console.log(result.data);
  return result.data;
}
export const getEmployeeReimbursements = async(): Promise<Reimbursement[]> => {
  const result = await trmsClient.get<Reimbursement[]>('/api/v1/reimbursements/:username');
  return result.data;
}
export const deleteReimbursement = async(id: string): Promise<void> => {
  console.log('API id: ', id);
  await trmsClient.delete<boolean>(`/api/v1/reimbursement/:${id}`);
}
