import { EntityRepository, Repository } from 'typeorm';
import { CreateTrustedAccountDto } from './dto/create-TrustedAccount.dto';
import { TrustedAccount } from './trustedAccount.entity';
import { GetTrustedAccountsFilterDto } from './dto/get-TrustedAccount-filter.dto';

@EntityRepository(TrustedAccount)
export class TrustedAccountsRepository extends Repository<TrustedAccount> {
	async getTrustedAccounts(
		filterDto: GetTrustedAccountsFilterDto,
	): Promise<TrustedAccount[]> {
		const { user, search } = filterDto;

		const query = this.createQueryBuilder('TrustedAccount');

		if (user) {
			query.andWhere('TrustedAccount.user = :user', { user });
		}

		if (search) {
			query.andWhere('LOWER(TrustedAccount.name) LIKE LOWER(:search)', {
				search: `%${search}%`,
			});
		}
		const TrustedAccounts = await query.getMany();
		return TrustedAccounts;
	}

	async getTrustedAccountsByUser(user: string): Promise<TrustedAccount[]> {
		const query = this.createQueryBuilder('TrustedAccount');
		query.andWhere('TrustedAccount.user = :user', { user });
		const TrustedAccounts = await query.getMany();
		return TrustedAccounts;
	}

	async createTrustedAccount(
		createTrustedAccountDto: CreateTrustedAccountDto,
	): Promise<TrustedAccount> {
		const { user, trustedAccount } = createTrustedAccountDto;

		const TrustedAccount = this.create({
			user,
			trustedAccount,
		});

		await this.save(TrustedAccount);
		return TrustedAccount;
	}
}
