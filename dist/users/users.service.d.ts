import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import { Otp } from '../otp/entities/otp.entity.js';
import { LoginUserDto } from './dto/login-user.dto.js';
export declare class UsersService {
    private userModel;
    private otpModel;
    private jwtService;
    constructor(userModel: typeof User, otpModel: typeof Otp, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByTelegramId(telegramId: string): Promise<User>;
    findByFirstName(firstName: string): Promise<User[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    loginWithOtp(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
        role: "user" | "admin" | "teacher";
        user: User;
    }>;
}
