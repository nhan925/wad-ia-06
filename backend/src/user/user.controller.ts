import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true }))
    registerUserDto: RegisterUserDto,
  ) {
    return this.userService.register(registerUserDto);
  }
}
