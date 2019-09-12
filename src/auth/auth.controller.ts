import { Controller, Res, Post, Body, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { SignUpService } from './signup.service';

@Controller('auth')
export class AuthController {
    constructor(
        private loginService: LoginService,
        private signupService: SignUpService
    ) { }

    @Post('/login')
    public async login(@Res() res,
        @Body('email') email,
        @Body('password') password) {
        const auth = await this.loginService.login(email, password);
        res.status(HttpStatus.OK).json(auth);
    }
    @Post('/signup')
    public async signup(@Res() res, @Body('email') email, @Body('password') password, @Body('username') username) {
        const auth = await this.signupService.signup(email, password, username);
        res.status(HttpStatus.OK).json(auth);
    }
}
