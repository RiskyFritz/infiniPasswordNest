import { Module } from '@nestjs/common';
import { PasswordsController } from './password.controller';
import { PasswordsService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordsRepository } from './password.repository';

@Module({
	imports: [TypeOrmModule.forFeature([PasswordsRepository])],
	controllers: [PasswordsController],
	providers: [PasswordsService],
})
export class PasswordsModule {}
