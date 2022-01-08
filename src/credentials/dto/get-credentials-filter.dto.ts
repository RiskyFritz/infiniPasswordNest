import { IsOptional, IsString } from 'class-validator';

export class GetCredentialsFilterDto {
	@IsOptional()
	@IsString()
	username?: string;

	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	@IsString()
	password?: string;
}
