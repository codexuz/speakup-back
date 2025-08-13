import { UserResponseService } from './user-response.service.js';
import { CreateUserResponseDto } from './dto/create-user-response.dto.js';
import { UpdateUserResponseDto } from './dto/update-user-response.dto.js';
export declare class UserResponseController {
    private readonly userResponseService;
    constructor(userResponseService: UserResponseService);
    create(createDto: CreateUserResponseDto): Promise<import("./entities/user-response.entity.js").UserResponse>;
    findAll(): Promise<import("./entities/user-response.entity.js").UserResponse[]>;
    findByUserId(userId: string): Promise<import("./entities/user-response.entity.js").UserResponse[]>;
    findByReadingId(readingId: string): Promise<import("./entities/user-response.entity.js").UserResponse[]>;
    findByUserAndReading(userId: string, readingId: string): Promise<import("./entities/user-response.entity.js").UserResponse>;
    findOne(id: string): Promise<import("./entities/user-response.entity.js").UserResponse>;
    update(id: string, updateDto: UpdateUserResponseDto): Promise<import("./entities/user-response.entity.js").UserResponse>;
    remove(id: string): Promise<void>;
}
