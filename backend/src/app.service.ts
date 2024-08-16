import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';
import { AuthBody, AuthRes, RegisterRes, User } from './types/services';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @InjectClient() private readonly pg: Client,
    private readonly jwtService: JwtService,
  ) {}
  public async login(authBody: AuthBody): Promise<AuthRes | string> {
    const user = await this.pg.query(
      'SELECT * FROM users WHERE email = $1 and password = $2',
      [authBody.username, authBody.password],
    );
    if (user.rows.length > 0) {
      const payload: object = {
        username: user.rows[0].email,
        userid: user.rows[0].id,
      };
      const options: JwtSignOptions = { expiresIn: '1h' };
      const token = this.jwtService.sign(payload, options);
      const response: AuthRes = { token };
      return response;
    } else {
      return "User and password don't match";
    }
  }

  public async register(body: User): Promise<RegisterRes> {
    try {
      const user = await this.pg.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [body.name, body.email, body.password],
      );
      if (user.rowCount > 0) {
        return { result: 'done' };
      } else {
        return { result: 'error' };
      }
    } catch (error) {
      console.error(error);
    }
  }
}
