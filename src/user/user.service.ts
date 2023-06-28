import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async createUsers(): Promise<void> {
    const users = [
      { name: 'User 1', apiKey: 'abc123' },
      { name: 'User 2', apiKey: 'def456' },
      { name: 'User 3', apiKey: 'ghi789' },
      { name: 'User 4', apiKey: 'jkl012' },
      { name: 'User 5', apiKey: 'mno345' },
    ];

    for (const user of users) {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
    }
  }
  async findByApiKey(apiKey: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { apiKey: apiKey },
    });
    return user;
  }
}
