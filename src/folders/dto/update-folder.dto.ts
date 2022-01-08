import { IsNotEmpty } from 'class-validator';

export class UpdateFolderDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	folder: string;
}
