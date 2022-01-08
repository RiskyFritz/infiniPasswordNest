import { IsNotEmpty } from 'class-validator';

export class CreateTrustedAccountDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	trustedAccount: string;
}
