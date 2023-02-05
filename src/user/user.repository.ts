import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private userList: User[] = [];

  async save(user: User) {
    this.userList.push(user);
    return { id: user.id, message: 'Usuário criado!' };
  }

  async getAll() {
    return this.userList;
  }

  async userWithEmailExistis(email: string) {
    const userFound = this.userList.find((user: User) => user.email === email);
    return userFound !== undefined;
  }

  async updateUser(id: string, userUpdate: Partial<User>) {
    const userFound = this.findByID(id);

    Object.entries(userUpdate).forEach(([key, value]) => {
      if (key === id) {
        return;
      }
      userFound[key] = value;
    });

    return userFound;
  }

  async deleteUser(id: string) {
    const userFound = this.findByID(id);
    this.userList = this.userList.filter((user) => user.id !== userFound.id);
    return userFound;
  }

  private findByID(id: string) {
    const userFound = this.userList.find((user) => user.id === id);
    if (!userFound) {
      throw new Error('User NotFound!');
    }

    return userFound;
  }
}
