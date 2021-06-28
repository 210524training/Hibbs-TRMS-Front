//match properties with feild from the response object
export default interface User{
    department: string;
    password:string;
    supervisor:string | null;
    ObjType: "Employee" | "Supervisor" | 'Department Head' | 'Benefits Controller';
    awardedReimbursements:number;
    pendingReimbursements:number;
    username:string;
    availableReimbursements:number;
    ID:string;
    RealName:string;
};
/*
export default interface User {
    username: string;
    password: string;    
    address?: string;
    phoneNumber?: string;
    role: Role;
    amount: number;
    id: string;
}
*/

//export type Role = 'Employee' | 'DirSupervisor' | 'DepHead' | 'BenCo';