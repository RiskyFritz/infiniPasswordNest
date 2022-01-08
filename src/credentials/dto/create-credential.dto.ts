import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCredentialDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	strength: number;

	@IsOptional()
	folder: string;

	@IsOptional()
	url: string;

	@IsOptional()
	notes: string;

	@IsOptional()
	sharedWith: string;
}
