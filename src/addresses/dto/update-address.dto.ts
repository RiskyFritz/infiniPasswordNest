import { IsNotEmpty, IsOptional } from 'class-validator';
import { AddressTitle } from '../address.title-enum';

export class UpdateAddressDto {
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

	@IsOptional()
	address: string;

	@IsOptional()
	address2: string;

	@IsOptional()
	city: string;

	@IsOptional()
	state: string;

	@IsOptional()
	zip: string;

	@IsOptional()
	country: string;

	@IsOptional()
	phone: string;

	@IsOptional()
	notes: string;
}
