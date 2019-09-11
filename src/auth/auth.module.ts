import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpService } from './signup.service';
import { LoginService } from './login.service';
import { AuthHelper } from './auth.helper';
import { UserModule } from '../user/user.module';


@Module({
  controllers: [ AuthController ],
  providers:[LoginService,SignUpService,AuthHelper],
  imports: [UserModule]
})

export class AuthModule {}
