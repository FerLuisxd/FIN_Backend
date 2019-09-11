import { HttpException, Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthHelper } from './auth.helper';

@Injectable()
export class SignUpService {
    constructor(private userService:UserService, private authHelper:AuthHelper){
    }

/*******************************************************
 * SignUp user account
 *******************************************************/
  public async signup(email,password,username){
    let res = await this.userService.createUser(username,email,password)
    if(res.registered){
      let id = res.id
      let role = res.role
      return this.authHelper.genToken(({email,password,id,role}))
    }
    else{
      throw new BadRequestException("Incorrect signup data")
    }

  }

}