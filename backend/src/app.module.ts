import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from 'nest-postgres';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './middleware/auth';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo/todo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PostgresModule.forRoot({
      host: process.env.ENV_DB_HOST,
      database: process.env.ENV_DB_name,
      password: process.env.ENV_DB_PASSWORD,
      user: process.env.ENV_DB_USER,
      port: parseInt(process.env.ENV_DB_PORT),
    }),
    JwtModule.register({ secret: process.env.ENV_SECRET }),
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('todo'); // cambiar por otro valor si no quieres jwt
  }
}
