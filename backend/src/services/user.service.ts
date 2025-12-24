import { Reward } from "../models/reward.model";
import { UserReward } from "../models/user-reward.model";
import { User } from "../models/user.model";
import { registerUserType, LoginUserType, UpdateUserType } from "../validations/user.schema";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    private readonly SALT_ROUNDS = 10;
    private readonly JWT_SECRET = process.env.JWT_SECRET;

    async Register(userData: registerUserType): Promise<User> {
        const existing = await User.findOne({ where: { email: userData.email } })
        if (existing) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

        const newUser = await User.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            phone: userData.phone,
            role: 'client',
            points_balance: 0
        })

        return newUser;
    }

    async Login(userData: LoginUserType): Promise<{user:User, token:string}> {
        const user = await User.findOne({ where: { email: userData.email } });
        if (!user) {
            throw new Error('Credenciales invalidas');
        }

        const isValidPassword = await bcrypt.compare(userData.password, user.password);
        if (!isValidPassword) {
            throw new Error('Credenciales invalidas');
        }
        
        if(!this.JWT_SECRET){
            throw new Error('No existe la clave secreta JWT_SECRET');
        }

        const token = jwt.sign(
            {id:user.id, role:user.role},
            this.JWT_SECRET,
            {expiresIn: '2h'}
        );

        return {user, token};

    }

async getUser(id: number): Promise<User | null> {
        if (!id) throw new Error('ID invalido');
        
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: UserReward,
                    as: 'redeemedRewards', // Según tus asociaciones
                    include: [{ model: Reward, as: 'reward' }] // Para ver el nombre del premio
                }
            ]
        });

        if (!user) throw new Error('Usuario no encontrado');
        return user;
    }

async getAllUsers(page: number = 1, limit: number = 10) {
        const offset = (page - 1) * limit;

        const { rows, count } = await User.findAndCountAll({
            attributes: { exclude: ['password'] },
            limit: limit,
            offset: offset,
            order: [['created_at', 'DESC']], 
            distinct: true 
        });

        return {
            users: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        };
    }

    async promoteToAdmin(id:number):Promise<User>{
        const user = await User.findByPk(id);
        if(!user){
            throw new Error('Usuario no encontrado');
        }
        user.role = 'admin';
        await user.save();
        return user;
    }

    async updateUser(id:number, data:UpdateUserType):Promise<User>{
        const user = await User.findByPk(id);
        if(!user){
            throw new Error('Usuario no encontrado');
        }
        await user.update(data);
        return user;
    }

}