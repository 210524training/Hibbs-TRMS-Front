
export default interface User{
    department: string;
    password:string;
    supervisor:string | null;
    status:'',
    ObjType: "Employee" | "Supervisor" | 'Department Head' | 'Benefits Controller';
    awardedReimbursements:number;
    pendingReimbursements:number;
    username:string;
    availableReimbursements:number;
    ID:string;
    RealName:string;
};
