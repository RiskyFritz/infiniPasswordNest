import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSecureNoteDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	name: string;

	@IsOptional()
	folder: string;

	@IsNotEmpty()
	notes: string;
}
