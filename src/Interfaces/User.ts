export interface Role {
    id: string;
    name: string;
}

export interface Position {
    id: string;
    name?: string;
}

export interface Permission {
    id: string;
    name: string;
}

export interface User {
    id:string;
    name: string;
    email: string;
    password: string;
    position: Position ; 
    phone_number:string;
    image: string;
    role: Role[] ;
    // for users
    is_approved: string;
    roles: Role[];
    permissions:Permission[];
    number_of_trips:number;
    
}