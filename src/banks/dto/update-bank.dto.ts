import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBankDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	name: string;

	@IsOptional()
	folder: string;

	@IsOptional()
	bankName: string;

	@IsOptional()
	accountType: string;

	@IsOptional()
	routingNumber: string;

	@IsOptional()
	accountNumber: string;

	@IsOptional()
	bankWebsite: string;

	@IsOptional()
	bankPhone: string;

	@IsOptional()
	notes: string;
}
