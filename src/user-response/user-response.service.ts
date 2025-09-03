import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserResponse } from './entities/user-response.entity.js';
import { CreateUserResponseDto } from './dto/create-user-response.dto.js';
import { UpdateUserResponseDto } from './dto/update-user-response.dto.js';
import { User } from '../users/entities/user.entity.js';
import { Reading } from '../reading/entities/reading.entity.js';

@Injectable()
export class UserResponseService {
  constructor(
    @InjectModel(UserResponse)
    private readonly userResponseModel: typeof UserResponse,
  ) {}

  /**
   * Create a new user response
   */
  async create(createDto: CreateUserResponseDto): Promise<UserResponse> {
    return this.userResponseModel.create(createDto);
  }

  /**
   * Find all user responses
   */
  async findAll(): Promise<UserResponse[]> {
    return this.userResponseModel.findAll({
      include: [User, Reading]
    });
  }

  /**
   * Find user responses by user ID
   */
  async findByUserId(userId: string): Promise<UserResponse[]> {
    return this.userResponseModel.findAll({
      where: { user_id: userId },
      include: [Reading]
    });
  }

  /**
   * Find user responses by reading ID
   */
  async findByReadingId(readingId: string): Promise<UserResponse[]> {
    return this.userResponseModel.findAll({
      where: { reading_id: readingId },
      include: [User]
    });
  }

  /**
   * Find a specific user's response to a specific reading
   */
  async findByUserAndReading(userId: string, readingId: string): Promise<UserResponse> {
    const response = await this.userResponseModel.findOne({
      where: {
        user_id: userId,
        reading_id: readingId
      }
    });
    
    if (!response) {
      throw new NotFoundException(`User response not found for user ${userId} and reading ${readingId}`);
    }
    
    return response;
  }

  /**
   * Find user response by ID
   */
  async findOne(id: string): Promise<UserResponse> {
    const response = await this.userResponseModel.findByPk(id, {
      include: [User, Reading]
    });
    if (!response) {
      throw new NotFoundException(`User response with ID ${id} not found`);
    }
    return response;
  }

  /**
   * Update user response
   */
  async update(id: string, updateDto: UpdateUserResponseDto): Promise<UserResponse> {
    const response = await this.findOne(id);
    await response.update(updateDto);
    return response;
  }

  /**
   * Remove user response
   */
  async remove(id: string): Promise<void> {
    const response = await this.findOne(id);
    await response.destroy();
  }
}
