import { IsOptional, IsString } from 'class-validator';

export class GetFoldersFilterDto {
	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	search?: string;
}
