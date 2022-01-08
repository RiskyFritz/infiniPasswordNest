/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSecureNoteDto } from './dto/create-SecureNote.dto';
import { GetSecureNotesFilterDto } from './dto/get-SecureNote-filter.dto';
import { SecureNotesRepository } from './secureNotes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SecureNote } from './secureNote.entity';
import { UpdateSecureNoteDto } from './dto/update-secureNote.dto';

@Injectable()
export class SecureNotesService {
	constructor(
		@InjectRepository(SecureNotesRepository)
		private SecureNotesRepository: SecureNotesRepository,
	) {}

	async getSecureNotes(
		filterDto: GetSecureNotesFilterDto,
	): Promise<SecureNote[]> {
		return await this.SecureNotesRepository.getSecureNotes(filterDto);
	}

	async getSecureNoteById(id: string): Promise<SecureNote> {
		const found = await this.SecureNotesRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(`SecureNote with ID "${id}" not found`);
		}

		return found;
	}

	async getSecureNotesByUser(user: string): Promise<SecureNote[]> {
		return await this.SecureNotesRepository.getSecureNotesByUser(user);
	}

	async createSecureNote(
		CreateSecureNoteDto: CreateSecureNoteDto,
	): Promise<SecureNote> {
		return await this.SecureNotesRepository.createSecureNote(
			CreateSecureNoteDto,
		);
	}

	async deleteSecureNote(id: string): Promise<void> {
		const result = await this.SecureNotesRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`SecureNote with ID "${id}" not found`);
		}
	}

	async updateSecureNoteName(
		id: string,
		updateSecureNoteDto: UpdateSecureNoteDto,
	): Promise<SecureNote> {
		const secureNoteRecord = await this.getSecureNoteById(id);
		secureNoteRecord.user = updateSecureNoteDto.user;
		secureNoteRecord.name = updateSecureNoteDto.name;
		secureNoteRecord.folder = updateSecureNoteDto.folder;
		secureNoteRecord.notes = updateSecureNoteDto.notes;
		await this.SecureNotesRepository.save(secureNoteRecord);
		return secureNoteRecord;
	}
}
