import { Injectable } from '@nestjs/common';
import { Password } from './password.model';
import { v1 as uuid } from 'uuid';
import { CreatePasswordDto } from './dto/create-password-dto';

@Injectable()
export class PasswordService {
  private passwords: Password[] = [];

  getAllPasswords(): Password[] {
    return this.passwords;
  }
  
  getPasswordById(id: string): Password {
    //return this.passwords.find((password) => password.id === id);
    return this.passwords.find((password) => password.id === id);
  }
  
  createPassword(CreatePasswordDto: CreatePasswordDto): Password {
    const { url, name, folder, username, password, notes } = CreatePasswordDto;
    const newPassword: Password = {
      id: uuid(),
      url,
      name,
      folder,
      username,
      password,
      notes
    };

    this.passwords.push(newPassword);
    return newPassword;
  }

  deletePassword(id: string): void {
    this.passwords = this.passwords.filter((password) => password.id !== id);
  }

  updateCredentials(id: string, username: string, password: string): Password {
    const updatePassword = this.getPasswordById(id);
    updatePassword.username = username;
    updatePassword.password = password;
    return updatePassword;
  } 
}
