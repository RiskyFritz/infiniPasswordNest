import { IsOptional, IsString } from 'class-validator';

export class GetBanksFilterDto {
	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	search?: string;
}
