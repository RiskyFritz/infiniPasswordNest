import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateGroupDto {
	@IsNotEmpty()
	user: string;

	@IsOptional()
	groupName: string;

	@IsOptional()
	trustedAccounts: string[];
}
