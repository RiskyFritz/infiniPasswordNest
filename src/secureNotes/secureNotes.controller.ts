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
import { SecureNotesService } from './secureNotes.service';
import { SecureNote } from './secureNote.entity';
import { CreateSecureNoteDto } from './dto/create-SecureNote.dto';
import { GetSecureNotesFilterDto } from './dto/get-SecureNote-filter.dto';

@Controller('secureNotes')
export class SecureNotesController {
	constructor(private secureNotesService: SecureNotesService) {}

	@Get()
	async getSecureNotes(
		@Query() filterDto: GetSecureNotesFilterDto,
	): Promise<SecureNote[]> {
		return await this.secureNotesService.getSecureNotes(filterDto);
	}

	@Get('/:id')
	async getSecureNoteById(@Param('id') id: string): Promise<SecureNote> {
		return await this.secureNotesService.getSecureNoteById(id);
	}

	@Get('/:user')
	async getSecureNotesByUser(
		@Param('user') user: string,
	): Promise<SecureNote[]> {
		return await this.secureNotesService.getSecureNotesByUser(user);
	}

	@Post()
	async createSecureNote(
		@Body() createSecureNoteDto: CreateSecureNoteDto,
	): Promise<SecureNote> {
		console.log(createSecureNoteDto);
		return await this.secureNotesService.createSecureNote(
			createSecureNoteDto,
		);
	}

	@Delete('/:id')
	async deleteSecureNote(@Param('id') id: string): Promise<void> {
		return await this.secureNotesService.deleteSecureNote(id);
	}

	// change securenote name
	@Patch('/:id/name')
	async updateSecureNoteName(
		@Param('id') id: string,
		@Body() updateSecureNoteDto: CreateSecureNoteDto,
	): Promise<SecureNote> {
		return await this.secureNotesService.updateSecureNoteName(
			id,
			updateSecureNoteDto,
		);
	}
}
