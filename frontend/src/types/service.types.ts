export interface Service{
    id:number;
    name:string;
    description:string;
    price:string;
    duration_minutes:number; //minutos
    points_reward:number;
    active:boolean;
}

export interface CreateServiceDTO{
    name:string;
    description:string;
    price:string;
    duration_minutes:number;
    points_reward:number;
}

export type UpdateServiceDTO = Partial<CreateServiceDTO>;

export interface ApiResponse<T>{
    success:boolean;
    message:string;
    data:T;
}