import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetAddressesFilterDto } from './dto/get-address-filter.dto';

@Controller('addresses')
export class AddressesController {
	constructor(private addressesService: AddressesService) {}

	@Get()
	getAddresses(
		@Query() filterDto: GetAddressesFilterDto,
	): Promise<Address[]> {
		return this.addressesService.getAddresses(filterDto);
	}

	@Get('/:id')
	getAddressById(@Param('id') id: string): Promise<Address> {
		return this.addressesService.getAddressById(id);
	}

	@Get('/:user')
	getAddressesByUser(@Param('user') user: string): Promise<Address[]> {
		return this.addressesService.getAddressesByUser(user);
	}

	@Post()
	async createAddress(
		@Body() createAddressDto: CreateAddressDto,
	): Promise<Address> {
		console.log(createAddressDto);
		return await this.addressesService.createAddress(createAddressDto);
	}

	@Delete('/:id')
	async deleteAddress(@Param('id') id: string): Promise<void> {
		return await this.addressesService.deleteAddress(id);
	}

	// change address name
	@Patch('/:id/name')
	async updateAddressName(
		@Param('id') id: string,
		@Body() updateAddressDto: CreateAddressDto,
	): Promise<Address> {
		return await this.addressesService.updateAddressName(
			id,
			updateAddressDto,
		);
	}
}
