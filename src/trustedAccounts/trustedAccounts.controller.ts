import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { TrustedAccountsService } from './trustedAccounts.service';
import { TrustedAccount } from './trustedAccount.entity';
import { CreateTrustedAccountDto } from './dto/create-TrustedAccount.dto';
import { GetTrustedAccountsFilterDto } from './dto/get-TrustedAccount-filter.dto';

@Controller('trustedaccounts')
export class TrustedAccountsController {
	constructor(private trustedAccountsService: TrustedAccountsService) {}

	@Get()
	async getTrustedAccounts(
		@Query() filterDto: GetTrustedAccountsFilterDto,
	): Promise<TrustedAccount[]> {
		return await this.trustedAccountsService.getTrustedAccounts(filterDto);
	}

	@Get('/:id')
	async getTrustedAccountById(
		@Param('id') id: string,
	): Promise<TrustedAccount> {
		return await this.trustedAccountsService.getTrustedAccountById(id);
	}

	@Get('/:user')
	async getTrustedAccountsByUser(
		@Param('user') user: string,
	): Promise<TrustedAccount[]> {
		return await this.trustedAccountsService.getTrustedAccountsByUser(user);
	}

	@Post()
	async createTrustedAccount(
		@Body() createTrustedAccountDto: CreateTrustedAccountDto,
	): Promise<TrustedAccount> {
		console.log(createTrustedAccountDto);
		return await this.trustedAccountsService.createTrustedAccount(
			createTrustedAccountDto,
		);
	}

	@Delete('/:id')
	async deleteTrustedAccount(@Param('id') id: string): Promise<void> {
		return await this.trustedAccountsService.deleteTrustedAccount(id);
	}
}
