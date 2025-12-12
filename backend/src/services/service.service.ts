import { Service } from "../models/service.model";
import { CreateServiceType, UpdateServiceType } from "../validations/service.schema";

export class ServiceService{
    async createService(data:CreateServiceType):Promise<Service>{
        const newService = await Service.create(data);
        return newService;
    }

    async getAllServices():Promise<Service[]>{
        return await Service.findAll({
            order:[['name', 'ASC']]
        });
    }

    async getActiveServices():Promise<Service[]>{
        return await Service.findAll({
            where:{active:true},
            attributes:{exclude:['created_at', 'updated_at']},
            order:[['price', 'ASC']]
        });
    }

    async getServiceById(id:number):Promise<Service>{
        const service = await Service.findByPk(id);
        if(!service){
            throw new Error('Servicio no encontrado');
        }
        return service;
    }

    async updateService(id:number, data:UpdateServiceType):Promise<Service>{
        const service = await Service.findByPk(id);
        if(!service){
            throw new Error('Servicio no encontrado');
        }

        const updatedService = await service.update(data);
        return updatedService;
    }

    async deleteService(id:number):Promise<void>{
        const service = await Service.findByPk(id);
        if(!service){
            throw new Error('Servicio no encontrado');
        }
        await service.update({active:false});
    }

}