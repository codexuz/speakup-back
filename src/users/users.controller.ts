import { Controller, Get, Post, Body, Patch, Param, Req, Delete, HttpCode, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('telegram/:telegramId')
  @UseGuards(JwtAuthGuard)
  findByTelegramId(@Param('telegramId') telegramId: string) {
    return this.usersService.findByTelegramId(telegramId);
  }

  @Get('name/:firstName')
  @UseGuards(JwtAuthGuard)
  findByFirstName(@Param('firstName') firstName: string) {
    return this.usersService.findByFirstName(firstName);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


   @Get('me')
  @UseGuards(JwtAuthGuard)
   async getProfile(@Req() req) {
    return this.usersService.getProfile(req.user.userId); 
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.usersService.loginWithOtp(loginUserDto);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}

