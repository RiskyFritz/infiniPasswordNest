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
import { PasswordsService } from './password.service';
import { Password } from './password.entity';
import { CreatePasswordDto } from './dto/create-password.dto';
import { GetPasswordsFilterDto } from './dto/get-password-filter.dto';

@Controller('passwords')
export class PasswordsController {
	constructor(private passwordsService: PasswordsService) {}

	@Get()
	async getPasswords(
		@Query() filterDto: GetPasswordsFilterDto,
	): Promise<Password[]> {
		return await this.passwordsService.getPasswords(filterDto);
	}

	@Get('/:id')
	async getPasswordById(@Param('id') id: string): Promise<Password> {
		return await this.passwordsService.getPasswordById(id);
	}

	@Get('/:user')
	async getPasswordsByUser(@Param('user') user: string): Promise<Password[]> {
		return await this.passwordsService.getPasswordsByUser(user);
	}

	@Get('/lastUsedOn')
	async getRecentPasswords(@Param('user') user: string): Promise<Password[]> {
		return await this.passwordsService.getRecentPasswords(user);
	}

	@Post()
	async createPassword(
		@Body() createPasswordDto: CreatePasswordDto,
	): Promise<Password> {
		console.log(createPasswordDto);
		return await this.passwordsService.createPassword(createPasswordDto);
	}

	@Delete('/:id')
	async deletePassword(@Param('id') id: string): Promise<void> {
		return await this.passwordsService.deletePassword(id);
	}

	@Patch('/:id/lastUpdatedOn')
	async updateLastUpdatedOn(
		@Param('id') id: string,
		@Body('lastUpdatedOn') lastUpdatedOn: Date,
	): Promise<Password> {
		return await this.passwordsService.updateLastUpdatedOn(
			id,
			lastUpdatedOn,
		);
	}
}
