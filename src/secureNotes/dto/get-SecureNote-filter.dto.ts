import { IsOptional, IsString } from 'class-validator';

export class GetSecureNotesFilterDto {
	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	search?: string;
}
