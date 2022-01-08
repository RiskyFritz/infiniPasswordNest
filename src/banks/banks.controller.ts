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
import { BanksService } from './banks.service';
import { Bank } from './bank.entity';
import { CreateBankDto } from './dto/create-bank.dto';
import { GetBanksFilterDto } from './dto/get-bank-filter.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('banks')
export class BanksController {
	constructor(private banksService: BanksService) {}

	@Get()
	getBanks(@Query() filterDto: GetBanksFilterDto): Promise<Bank[]> {
		return this.banksService.getBanks(filterDto);
	}

	@Get('/:id')
	getBankById(@Param('id') id: string): Promise<Bank> {
		return this.banksService.getBankById(id);
	}

	@Get('/:user')
	getBanksByUser(@Param('user') user: string): Promise<Bank[]> {
		return this.banksService.getBanksByUser(user);
	}

	@Post()
	async createBank(@Body() createBankDto: CreateBankDto): Promise<Bank> {
		console.log(createBankDto);
		return await this.banksService.createBank(createBankDto);
	}

	@Delete('/:id')
	async deleteBank(@Param('id') id: string): Promise<void> {
		return await this.banksService.deleteBank(id);
	}

	// change bank name
	@Patch('/:id/name')
	async updateBank(
		@Param('id') id: string,
		@Body() updateBankDto: UpdateBankDto,
	): Promise<Bank> {
		return await this.banksService.updateBank(id, updateBankDto);
	}
}
