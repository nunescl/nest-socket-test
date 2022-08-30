import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { UsersRepository } from './auth/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'postgress',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [AppGateway, UsersRepository, JwtService, AuthService],
})
export class AppModule {}
