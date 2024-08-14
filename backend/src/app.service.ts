import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { AuthBody } from './types/services';

@Injectable()
export class AppService {
  constructor(@InjectClient() private readonly pg: Client) {}
  getUser(authBody: AuthBody): boolean {
    const user = this.pg.query(
      'SELET * FROM USERS WHERE username = 1$ and password = 2$',
      [authBody.username, authBody.password],
    );
    if (user.rows) return true;
    else return false;
  }
}
