import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  public auth(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.appService.login({
      username: username,
      password: password,
    });
  }
  @Post('register')
  public register(
    @body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.appService.auth(username, password)
  }
}
