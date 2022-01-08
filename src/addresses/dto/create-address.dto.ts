import { IsNotEmpty, IsOptional } from 'class-validator';
import { AddressTitle } from '../address.title-enum';

export class CreateAddressDto {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	name: string;

	@IsOptional()
	folder: string;

	@IsOptional()
	title: AddressTitle;

	@IsOptional()
	firstName: string;

	@IsOptional()
	lastName: string;

	@IsOptional()
	company: string;

	@IsNotEmpty()
	address: string;

	@IsOptional()
	address2: string;

	@IsNotEmpty()
	city: string;

	@IsNotEmpty()
	state: string;

	@IsNotEmpty()
	zip: string;

	@IsOptional()
	country: string;

	@IsOptional()
	phone: string;

	@IsOptional()
	notes: string;
}
