import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<{
    message: string;
    user: { id: string; email: string; createdAt: Date };
  }> {
    const { email, password } = registerUserDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    try {
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const user = this.userRepository.create({
        email,
        password: hashedPassword,
      });

      // Save user to database
      const savedUser = await this.userRepository.save(user);

      // Return response without password
      return {
        message: 'User registered successfully',
        user: {
          id: savedUser.id,
          email: savedUser.email,
          createdAt: savedUser.createdAt,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }
}
