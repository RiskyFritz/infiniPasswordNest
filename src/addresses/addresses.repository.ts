import { EntityRepository, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './address.entity';
import { GetAddressesFilterDto } from './dto/get-address-filter.dto';

@EntityRepository(Address)
export class AddressesRepository extends Repository<Address> {
	async getAddresses(filterDto: GetAddressesFilterDto): Promise<Address[]> {
		const { user, search } = filterDto;

		const query = this.createQueryBuilder('Address');

		if (user) {
			query.andWhere('Address.user = :user', { user });
		}

		if (search) {
			query.andWhere(
				'LOWER(Address.name) LIKE LOWER(:search) OR LOWER(Address.address) LIKE LOWER(:search) OR LOWER(Address.zip) LIKE LOWER(:search) OR LOWER(Address.company) LIKE LOWER(:search)',
				{
					search: `%${search}%`,
				},
			);
		}
		const Addresses = await query.getMany();
		return Addresses;
	}

	async getAddressesByUser(user: string): Promise<Address[]> {
		const query = this.createQueryBuilder('Address');
		query.andWhere('Address.user = :user', { user });
		const Addresses = await query.getMany();
		return Addresses;
	}

	async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
		const { user, folder } = createAddressDto;

		const Address = this.create({
			user,
			folder,
		});

		await this.save(Address);
		return Address;
	}
}
