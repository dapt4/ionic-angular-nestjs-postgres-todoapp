import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('todo')
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
}
