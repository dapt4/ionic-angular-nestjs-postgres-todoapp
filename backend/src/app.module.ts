import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from 'nest-postgres';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
