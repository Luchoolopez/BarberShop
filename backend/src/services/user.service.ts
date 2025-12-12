import { User } from "../models/user.model";
import { registerUserType, LoginUserType } from "../validations/user.schema";
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
            role: 'client'
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

    async getUser(id:number):Promise<User | null>{
        if(!id){
            throw new Error('ID invalido');
        }
        const user = await User.findByPk(id, {
            attributes: {exclude: ['password']}
        });
        if(!user){
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    async getAllUsers():Promise<User[]>{
        return await User.findAll({
            attributes:{exclude: ['password']}
        });
    }


}