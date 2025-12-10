import { User } from "../models/user.model";
import { registerUserType, LoginUserType } from "../validations/user.schema";
import bcrypt from 'bcrypt';

export class UserService {

    private readonly SALT_ROUNDS = 10;

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

    async Login(userData: LoginUserType): Promise<User | null> {
        const user = await User.findOne({ where: { email: userData.email } });
        if (!user) {
            throw new Error('Credenciales invalidas');
        }

        const isValidPassword = await bcrypt.compare(userData.password, user.password);
        if (!isValidPassword) {
            throw new Error('Credenciales invalidas');
        }
        return user;

    }


}