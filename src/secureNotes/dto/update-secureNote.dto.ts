import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSecureNoteDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	name: string;

	@IsOptional()
	folder: string;

	@IsOptional()
	notes: string;
}
