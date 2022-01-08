/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrustedAccountDto } from './dto/create-TrustedAccount.dto';
import { GetTrustedAccountsFilterDto } from './dto/get-TrustedAccount-filter.dto';
import { TrustedAccountsRepository } from './trustedAccounts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TrustedAccount } from './trustedAccount.entity';

@Injectable()
export class TrustedAccountsService {
	constructor(
		@InjectRepository(TrustedAccountsRepository)
		private TrustedAccountsRepository: TrustedAccountsRepository,
	) {}

	async getTrustedAccounts(
		filterDto: GetTrustedAccountsFilterDto,
	): Promise<TrustedAccount[]> {
		return await this.TrustedAccountsRepository.getTrustedAccounts(
			filterDto,
		);
	}

	async getTrustedAccountById(id: string): Promise<TrustedAccount> {
		const found = await this.TrustedAccountsRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(
				`TrustedAccount with ID "${id}" not found`,
			);
		}

		return found;
	}

	async getTrustedAccountsByUser(user: string): Promise<TrustedAccount[]> {
		return await this.TrustedAccountsRepository.getTrustedAccountsByUser(
			user,
		);
	}

	async createTrustedAccount(
		CreateTrustedAccountDto: CreateTrustedAccountDto,
	): Promise<TrustedAccount> {
		return await this.TrustedAccountsRepository.createTrustedAccount(
			CreateTrustedAccountDto,
		);
	}

	async deleteTrustedAccount(id: string): Promise<void> {
		const result = await this.TrustedAccountsRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(
				`TrustedAccount with ID "${id}" not found`,
			);
		}
	}
}
