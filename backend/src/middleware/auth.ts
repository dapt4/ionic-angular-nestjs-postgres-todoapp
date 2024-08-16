import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CustomRequest } from 'src/types/middleware';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}
  use(req: CustomRequest, res: Response, next: NextFunction) {
    // const secret: DecodeOptions = process.env.ENV_SECRET;
    if (!req.header('Authorization')) {
      return res
        .status(401)
        .send({ message: 'Request authorization header required' });
    }
    const token = req.header('Authorization').split(' ')[1];
    let payload = null;
    try {
      payload = this.jwt.decode(token);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
    if (payload.exp * 1000 <= new Date().getTime()) {
      return res.status(419).send({ message: 'Token expired' });
    }
    req.userid = payload.userid;
    req.appusername = payload.appusername;
    next();
  }
}
