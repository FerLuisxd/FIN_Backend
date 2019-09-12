import { HttpException, Injectable } from '@nestjs/common';
import { AuthHelper } from './auth.helper';
import { db } from '../db/sqlLite3';
const DB = require('better-sqlite3-helper');
let key = process.env.KEY||'dsaadsadsadsafsads2adsa';
 //update
// Create an encryptor:
let encryptor = require('simple-encryptor')(key);
@Injectable()
export class LoginService {

  constructor(
    private authHelper: AuthHelper
  ) { }

  /*******************************************************
   * Basic Login with credentials
   *******************************************************/
  public login(email, encryptedPass) {

    if (!email) {
      return (new HttpException("Email is required", 422))
    }
    if (!encryptedPass) {
      return (new HttpException("Password is required", 422))
    }
    return new Promise((resolve, reject) => {
      let row = DB().queryFirstRow('SELECT * FROM user WHERE email=?', email);
      if(row){
      if(row.password != encryptedPass){
        return reject(new HttpException("Incorrect password", 401))
      }
      else{
        return resolve(this.authHelper.genToken(row))
      }
    }

      // db.all(
      //   "SELECT * FROM user WHERE email = ?", [email], (err, user) => {

      //     if (err) {
      //       return reject(new HttpException(err, 503))
      //     }

      //     else {
      //       if (user.length === 0) {
      //         return reject(new HttpException("User does not exist", 401))
      //       }
      //       else {
      //         if (password != user[0].password) {
      //           return reject(new HttpException("Incorrect password", 401))
      //         }
      //         else {
      //           return resolve(this.authHelper.genToken(user[0]));
      //         }
      //       }
      //     }
      //   });
    });
  }

}