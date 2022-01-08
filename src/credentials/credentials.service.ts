/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from '../credentials/dto/create-credential.dto';
import { GetCredentialsFilterDto } from '../credentials/dto/get-credentials-filter.dto';
import { CredentialsRepository } from './credentials.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from './credential.entity';

@Injectable()
export class CredentialsService {
	constructor(
		@InjectRepository(CredentialsRepository)
		private CredentialsRepository: CredentialsRepository,
	) {}

	async getCredentials(
		filterDto: GetCredentialsFilterDto,
	): Promise<Credential[]> {
		return await this.CredentialsRepository.getCredentials(filterDto);
	}

	async getCredentialById(id: string): Promise<Credential> {
		const found = await this.CredentialsRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(`Credential with ID "${id}" not found`);
		}

		return found;
	}

	async getCredentialsByUser(user: string): Promise<Credential[]> {
		return await this.CredentialsRepository.getCredentialsByUser(user);
	}

	async getRecentCredentials(user: string): Promise<Credential[]> {
		return this.CredentialsRepository.getRecentCredentials(user);
	}

	async createCredential(
		CreateCredentialDto: CreateCredentialDto,
	): Promise<Credential> {
		return await this.CredentialsRepository.createCredential(
			CreateCredentialDto,
		);
	}

	async deleteCredential(id: string): Promise<void> {
		const result = await this.CredentialsRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Credential with ID "${id}" not found`);
		}
	}

	async updateLastUpdatedOn(
		id: string,
		lastUpdatedOn: Date,
	): Promise<Credential> {
		const credential = await this.getCredentialById(id);
		credential.lastUpdatedOn = lastUpdatedOn;
		await this.CredentialsRepository.save(credential);
		return credential;
	}
}
