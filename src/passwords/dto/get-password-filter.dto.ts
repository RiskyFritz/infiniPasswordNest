import { IsOptional, IsString } from 'class-validator';

export class GetPasswordsFilterDto {
	@IsOptional()
	@IsString()
	username?: string;

	@IsOptional()
	@IsString()
	groups?: string;

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
