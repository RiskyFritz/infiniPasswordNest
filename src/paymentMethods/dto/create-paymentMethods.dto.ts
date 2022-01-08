import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentMethodDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	name: string;

	@IsOptional()
	folder: string;

	@IsNotEmpty()
	nameOnCard: string;

	@IsNotEmpty()
	cardNumber: number;

	@IsNotEmpty()
	expirationDate: Date;

	@IsNotEmpty()
	cvv: number;

	@IsOptional()
	type: string;

	@IsOptional()
	notes: string;
}
