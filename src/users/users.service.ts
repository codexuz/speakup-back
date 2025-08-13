import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import { Otp } from '../otp/entities/otp.entity.js';
import { LoginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Otp)
    private otpModel: typeof Otp,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.password = createUserDto.password;
    await user.save();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password_hash'] }, // Exclude password from the response
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password_hash'] }, // Exclude password from the response
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByTelegramId(telegramId: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { telegramId },
      attributes: { exclude: ['password_hash'] }, // Exclude password from the response
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByFirstName(firstName: string): Promise<User[]> {
    const users = await this.userModel.findAll({
      where: { first_name: firstName },
      attributes: { exclude: ['password_hash'] }, // Exclude password from the response
    });
    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
    Object.assign(user, updateUserDto);
    await user.save();
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async loginWithOtp(loginUserDto: LoginUserDto) {
    const { otp_code } = loginUserDto;
    // Find OTP and user by OTP code (and not expired)
    const otp = await this.otpModel.findOne({ where: { otp_code, isExpired: false } });
    if (!otp || new Date(otp.expiration_date) < new Date()) throw new UnauthorizedException('Invalid or expired OTP');
    const user = await this.userModel.findOne({ where: { telegramId: otp.telegram_id, is_active: true } });
    if (!user) throw new UnauthorizedException('User not found');
    // Optionally expire OTP after use
    otp.isExpired = true;
    await otp.save();
    user.last_login = new Date();
    await user.save();
    const payload = { sub: user.id, role: user.role, telegram_id: user.telegramId };
    return { access_token: this.jwtService.sign(payload), role: user.role, user };
  }
}
