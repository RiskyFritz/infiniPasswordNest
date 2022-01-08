/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { GetPasswordsFilterDto } from './dto/get-password-filter.dto';
import { PasswordsRepository } from './password.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from './password.entity';

@Injectable()
export class PasswordsService {
	constructor(
		@InjectRepository(PasswordsRepository)
		private PasswordsRepository: PasswordsRepository,
	) {}

	async getPasswords(filterDto: GetPasswordsFilterDto): Promise<Password[]> {
		return await this.PasswordsRepository.getPasswords(filterDto);
	}

	async getPasswordById(id: string): Promise<Password> {
		const found = await this.PasswordsRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(`Password with ID "${id}" not found`);
		}

		return found;
	}

	async getPasswordsByUser(user: string): Promise<Password[]> {
		return await this.PasswordsRepository.getPasswordsByUser(user);
	}

	async getRecentPasswords(user: string): Promise<Password[]> {
		return this.PasswordsRepository.getRecentPasswords(user);
	}

	async createPassword(
		CreatePasswordDto: CreatePasswordDto,
	): Promise<Password> {
		return await this.PasswordsRepository.createPassword(CreatePasswordDto);
	}

	async deletePassword(id: string): Promise<void> {
		const result = await this.PasswordsRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Password with ID "${id}" not found`);
		}
	}

	async updateLastUpdatedOn(
		id: string,
		lastUpdatedOn: Date,
	): Promise<Password> {
		const password = await this.getPasswordById(id);
		password.lastUpdatedOn = lastUpdatedOn;
		await this.PasswordsRepository.save(password);
		return password;
	}
}
