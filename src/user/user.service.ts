import { Injectable, HttpException } from '@nestjs/common';
import * as uuid from 'uuid';
import { db } from '../db/sqlLite3';
const DB = require('better-sqlite3-helper');

@Injectable()
export class UserService {
  /*******************************************************
   * Get all Users
   *******************************************************/
  public getAllUsers() {
    return new Promise((resolve, reject) => {
      return resolve(DB().query('SELECT * FROM user'));
      db.all('SELECT * FROM user', function(err, rows) {
        return !err ? resolve(rows) : reject(new HttpException(err, 500));
      });
    });
  }

  /*******************************************************
   * Get One User by Id
   *******************************************************/

  public getUser(value: any) {
    return new Promise((resolve, reject) => {
      return resolve(
        DB().queryFirstRow('SELECT * FROM user WHERE id=?', value),
      );
      db.get('SELECT * FROM user WHERE id = ?', [value], (err, row) => {
        return !err ? resolve(row) : reject(new HttpException(err, 500));
      });
    });
  }

  /*******************************************************
   * Create User
   *******************************************************/

  public createUser(username: String, email: String, password: String): any {
    return new Promise((resolve, reject) => {
      try {
        let res = DB().insert('user', {
          username: username,
          password: password,
          email: email,
          role: 'normal',
        });
        if (res)
          return resolve({
            message: 'Registered',
            registered: true,
            id: res,
            role: 'normal',
          });
        return reject(new HttpException('Not Registered', 500));
      } catch (error) {
        return reject(new HttpException(error, 500));
      }
      // db.run(
      //   'INSERT INTO user (id, username, email, password, role)' +
      //     "VALUES (?, ?, ?, ?, 'user')",
      //   [uuid.v1().replace(/-/g, ''), username, email, password],
      //   err => {
      //     return !err
      //       ? resolve({ message: 'User has been registered' })
      //       : reject(new HttpException(err, 500));
      //   },
      // );
    });
  }

  /*******************************************************
   * Update User
   *******************************************************/

  public updateUser(
    id: String,
    username: String,
    email: String,
    password: String,
    role: String,
  ) {
    return new Promise((resolve, reject) => {
      try {
        let res = DB().updateWithBlackList(
          'user',
          {
            username: username,
            password: password,
            role: role,
          },
          id,
          ['id', 'email'],
        );
        if (res) return resolve({ message: 'Registered' });
        return reject(new HttpException('Not Registered', 500));
      } catch (err) {
        return reject(new HttpException(err, 500));
      }
      // db.run(
      //   'UPDATE user SET username=?, email=?, password=?, role=?' +
      //     'WHERE(id = ?);',
      //   [username, email, password, role, id],
      //   err => {
      //     return !err
      //       ? resolve({
      //           message: 'User ' + id + ' has been updated successfully',
      //         })
      //       : reject(new HttpException(err, 500));
      //   },
      // );
    });
  }

  /*******************************************************
   * Delete User
   *******************************************************/

  public deleteUser(id: String) {
    //WILL FAIL, NOT IMPLEMENTED.
    return new Promise((resolve, reject) => {
      db.run('DELETE From user WHERE id = ?', [id], err => {
        return !err
          ? resolve({ message: 'User ' + id + ' has been deleted' })
          : reject(new HttpException(err, 500));
      });
    });
  }
}
