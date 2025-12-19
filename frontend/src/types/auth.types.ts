export interface AuthResponse{
    token:string,
    user:{
        id:number;
        email:string;
        name:string;
        role: 'admin' | 'client';
    };
}

export interface LoginDTO{
    email:string,
    password:string;
}

export interface RegisterDTO{
    name:string;
    email:string;
    password:string;
    phone:string;
}