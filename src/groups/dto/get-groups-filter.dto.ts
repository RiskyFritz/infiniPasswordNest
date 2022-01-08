import { IsOptional, IsString } from 'class-validator';

export class GetGroupsFilterDto {
	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	search?: string;
}
