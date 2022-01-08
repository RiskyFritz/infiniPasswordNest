import { IsOptional, IsString } from 'class-validator';

export class GetAddressesFilterDto {
	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	search?: string;
}
