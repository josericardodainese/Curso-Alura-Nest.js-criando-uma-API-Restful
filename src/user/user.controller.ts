import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { UserResponse } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<any> {
    const user = new User();
    user.email = userDto.email;
    user.name = userDto.name;
    user.password = userDto.password;
    user.id = uuid();

    return this.userRepository.save(user);
  }
  @Get()
  async getUsers() {
    const users = await this.userRepository.getAll();
    return users.map((user) => new UserResponse(user.name, user.id));
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    return { user: updatedUser, message: 'User updated!' };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = this.userRepository.deleteUser(id);
    return { user: deletedUser, message: 'User deleted!' };
  }
}
