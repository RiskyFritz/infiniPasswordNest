import { IsOptional, IsString } from 'class-validator';

export class GetTrustedAccountsFilterDto {
	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	search?: string;
}
