export default interface User {
    username: string;
    password: string;    
    address?: string;
    phoneNumber?: string;
    role: Role;
    amount: number;
    id: string;
}

export type Role = 'Employee' | 'DirSupervisor' | 'DepHead' | 'BenCo';