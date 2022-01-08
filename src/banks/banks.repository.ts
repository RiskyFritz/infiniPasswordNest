import { EntityRepository, Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';
import { Bank } from './bank.entity';
import { GetBanksFilterDto } from './dto/get-bank-filter.dto';

@EntityRepository(Bank)
export class BanksRepository extends Repository<Bank> {
	async getBanks(filterDto: GetBanksFilterDto): Promise<Bank[]> {
		const { user, search } = filterDto;

		const query = this.createQueryBuilder('Bank');

		if (user) {
			query.andWhere('Bank.user = :user', { user });
		}

		if (search) {
			query.andWhere('LOWER(Bank.bank) LIKE LOWER(:search)', {
				search: `%${search}%`,
			});
		}
		const Banks = await query.getMany();
		return Banks;
	}

	async getBanksByUser(user: string): Promise<Bank[]> {
		const query = this.createQueryBuilder('Bank');
		query.andWhere('Bank.user = :user', { user });
		const Banks = await query.getMany();
		return Banks;
	}

	async createBank(createBankDto: CreateBankDto): Promise<Bank> {
		const {
			user,
			name,
			folder,
			bankName,
			accountType,
			routingNumber,
			accountNumber,
			bankWebsite,
			bankPhone,
			notes,
		} = createBankDto;

		const Bank = this.create({
			user,
			name,
			folder,
			bankName,
			accountType,
			routingNumber,
			accountNumber,
			bankWebsite,
			bankPhone,
			notes,
		});

		await this.save(Bank);
		return Bank;
	}
}
