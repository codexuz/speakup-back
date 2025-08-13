import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity.js").User>;
    findAll(): Promise<import("./entities/user.entity.js").User[]>;
    findByTelegramId(telegramId: string): Promise<import("./entities/user.entity.js").User>;
    findByFirstName(firstName: string): Promise<import("./entities/user.entity.js").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity.js").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity.js").User>;
    remove(id: string): Promise<void>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
        role: "user" | "admin" | "teacher";
        user: import("./entities/user.entity.js").User;
    }>;
}
