import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Vitor',
      email: 'vitor@email.com',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(
      (user) => user.id === id,
    );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(
    id: number,
    updateUserDto: UpdateUserDto,
  ) {
    const user = this.findOne(id);

    Object.assign(user, updateUserDto);

    return user;
  }
}