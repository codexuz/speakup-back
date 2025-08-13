import { UserResponse } from './entities/user-response.entity.js';
import { CreateUserResponseDto } from './dto/create-user-response.dto.js';
import { UpdateUserResponseDto } from './dto/update-user-response.dto.js';
export declare class UserResponseService {
    private readonly userResponseModel;
    constructor(userResponseModel: typeof UserResponse);
    create(createDto: CreateUserResponseDto): Promise<UserResponse>;
    findAll(): Promise<UserResponse[]>;
    findByUserId(userId: string): Promise<UserResponse[]>;
    findByReadingId(readingId: string): Promise<UserResponse[]>;
    findByUserAndReading(userId: string, readingId: string): Promise<UserResponse>;
    findOne(id: string): Promise<UserResponse>;
    update(id: string, updateDto: UpdateUserResponseDto): Promise<UserResponse>;
    remove(id: string): Promise<void>;
}
