import { IsNotEmpty } from 'class-validator';

export class CreateFolderDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	folder: string;
}
