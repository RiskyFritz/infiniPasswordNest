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
import { CredentialsService } from './credentials.service';
import { Credential } from './credential.entity';
import { CreateCredentialDto } from '../credentials/dto/create-credential.dto';
import { GetCredentialsFilterDto } from '../credentials/dto/get-credentials-filter.dto';

@Controller('credentials')
export class CredentialsController {
	constructor(private credentialsService: CredentialsService) {}

	@Get()
	async getCredentials(
		@Query() filterDto: GetCredentialsFilterDto,
	): Promise<Credential[]> {
		return await this.credentialsService.getCredentials(filterDto);
	}

	@Get('/:id')
	async getCredentialById(@Param('id') id: string): Promise<Credential> {
		return await this.credentialsService.getCredentialById(id);
	}

	@Get('/:user')
	async getCredentialsByUser(
		@Param('user') user: string,
	): Promise<Credential[]> {
		return await this.credentialsService.getCredentialsByUser(user);
	}

	@Get('/lastUsedOn')
	async getRecentCredentials(
		@Param('user') user: string,
	): Promise<Credential[]> {
		return await this.credentialsService.getRecentCredentials(user);
	}

	@Post()
	async createCredential(
		@Body() createCredentialDto: CreateCredentialDto,
	): Promise<Credential> {
		console.log(createCredentialDto);
		return await this.credentialsService.createCredential(
			createCredentialDto,
		);
	}

	@Delete('/:id')
	async deleteCredential(@Param('id') id: string): Promise<void> {
		return await this.credentialsService.deleteCredential(id);
	}

	@Patch('/:id/lastUpdatedOn')
	async updateLastUpdatedOn(
		@Param('id') id: string,
		@Body('lastUpdatedOn') lastUpdatedOn: Date,
	): Promise<Credential> {
		return await this.credentialsService.updateLastUpdatedOn(
			id,
			lastUpdatedOn,
		);
	}
}
