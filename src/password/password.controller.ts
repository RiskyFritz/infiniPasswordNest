import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PasswordService } from './password.service';
import { Password } from './password.model';
import { CreatePasswordDto } from './dto/create-password-dto';
import { GetPasswordFilterDto } from './dto/get-password-filter.dto';

@Controller('password')
export class PasswordController {
  constructor(private PasswordService: PasswordService) {}

  @Get()
  getPasswords(@Query() filterDto: GetPasswordFilterDto): Password[] {
    console.log(filterDto);
    return this.PasswordService.getAllPasswords();
  }

  @Get('/:id')
  getPasswordById(@Param('id') id: string): Password {
    return this.PasswordService.getPasswordById(id);
  }

  @Post()
  createPassword(@Body() CreatePasswordDto: CreatePasswordDto): Password {
    return this.PasswordService.createPassword(CreatePasswordDto);
  }

  @Delete('/:id')
  deletePassword(@Param('id') id: string): void {
    this.PasswordService.deletePassword(id);
  }

  @Patch('/:id')
  updateCredentials(
    @Param('id') id: string,
    @Body('username') username: string,
    @Body('passowrd') password: string
  ) {
    return this.PasswordService.updateCredentials(id, username, password);
  }
}
