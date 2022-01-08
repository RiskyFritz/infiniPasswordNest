import { IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	groupName: string;

	@IsNotEmpty()
	trustedAccounts: string[];
}
