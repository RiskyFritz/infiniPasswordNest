/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { GetBanksFilterDto } from './dto/get-bank-filter.dto';
import { BanksRepository } from './banks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './bank.entity';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BanksService {
	constructor(
		@InjectRepository(BanksRepository)
		private BanksRepository: BanksRepository,
	) {}

	async getBanks(filterDto: GetBanksFilterDto): Promise<Bank[]> {
		return this.BanksRepository.getBanks(filterDto);
	}

	async getBankById(id: string): Promise<Bank> {
		const found = await this.BanksRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(`Bank with ID "${id}" not found`);
		}

		return found;
	}

	getBanksByUser(user: string): Promise<Bank[]> {
		return this.BanksRepository.getBanksByUser(user);
	}

	async createBank(CreateBankDto: CreateBankDto): Promise<Bank> {
		return await this.BanksRepository.createBank(CreateBankDto);
	}

	async deleteBank(id: string): Promise<void> {
		const result = await this.BanksRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Bank with ID "${id}" not found`);
		}
	}

	async updateBank(id: string, updateBankDto: UpdateBankDto): Promise<Bank> {
		const bankRecord = await this.getBankById(id);
		// set bank dto values to bank record
		bankRecord.accountNumber = updateBankDto.accountNumber;
		bankRecord.accountType = updateBankDto.accountType;
		bankRecord.bankName = updateBankDto.bankName;
		bankRecord.routingNumber = updateBankDto.routingNumber;
		bankRecord.user = updateBankDto.user;
		bankRecord.bankPhone = updateBankDto.bankPhone;
		bankRecord.bankWebsite = updateBankDto.bankWebsite;
		bankRecord.folder = updateBankDto.folder;
		bankRecord.name = updateBankDto.name;
		await this.BanksRepository.save(bankRecord);
		return bankRecord;
	}
}
