import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { AuthBody } from './types/services';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @InjectClient() private readonly pg: Client,
    private readonly jwtService: JwtService,
  ) {}
  public async login(authBody: AuthBody): Promise<string> {
    const user = await this.pg.query(
      'SELECT * FROM usuarios WHERE email = $1 and password = $2',
      [authBody.username, authBody.password],
    );
    if (user.rows.length > 0) {
      const payload: object = {
        username: user.rows[0].email,
        userid: user.rows[0].id,
      };
      const options: JwtSignOptions = { expiresIn: '1h' };
      return this.jwtService.sign(payload, options);
    } else {
      return "User and password don't match";
    }
  }
}
