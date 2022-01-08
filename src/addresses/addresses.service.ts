/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetAddressesFilterDto } from './dto/get-address-filter.dto';
import { AddressesRepository } from './addresses.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
	constructor(
		@InjectRepository(AddressesRepository)
		private AddressesRepository: AddressesRepository,
	) {}

	getAddresses(filterDto: GetAddressesFilterDto): Promise<Address[]> {
		return this.AddressesRepository.getAddresses(filterDto);
	}

	async getAddressById(id: string): Promise<Address> {
		const found = await this.AddressesRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(`Address with ID "${id}" not found`);
		}

		return found;
	}

	getAddressesByUser(user: string): Promise<Address[]> {
		return this.AddressesRepository.getAddressesByUser(user);
	}

	async createAddress(CreateAddressDto: CreateAddressDto): Promise<Address> {
		return await this.AddressesRepository.createAddress(CreateAddressDto);
	}

	async deleteAddress(id: string): Promise<void> {
		const result = await this.AddressesRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Address with ID "${id}" not found`);
		}
	}

	async updateAddressName(
		id: string,
		updateAddressDto: UpdateAddressDto,
	): Promise<Address> {
		const folderRecord = await this.getAddressById(id);
		folderRecord.folder = updateAddressDto.folder;
		await this.AddressesRepository.save(folderRecord);
		return folderRecord;
	}
}
