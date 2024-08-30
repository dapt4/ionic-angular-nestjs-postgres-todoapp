import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthBody, User } from './types/services';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  public auth(@Body() body: AuthBody) {
    return this.appService.login({
      username: body.username,
      password: body.password,
    });
  }
  @Post('register')
  public register(@Body() body: User) {
    return this.appService.register(body);
  }
}
