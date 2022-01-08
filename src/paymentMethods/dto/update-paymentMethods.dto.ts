import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePaymentMethodDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	name: string;

	@IsOptional()
	folder: string;

	@IsOptional()
	nameOnCard: string;

	@IsOptional()
	cardNumber: number;

	@IsOptional()
	expirationDate: Date;

	@IsOptional()
	cvv: number;

	@IsOptional()
	type: string;

	@IsOptional()
	notes: string;
}
