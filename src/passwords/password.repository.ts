import { EntityRepository, Repository } from 'typeorm';
import { CreatePasswordDto } from './dto/create-password.dto';
import { Password } from './password.entity';
import { GetPasswordsFilterDto } from './dto/get-password-filter.dto';

@EntityRepository(Password)
export class PasswordsRepository extends Repository<Password> {
	async getPasswords(filterDto: GetPasswordsFilterDto): Promise<Password[]> {
		const { user, username, password, search } = filterDto;

		const query = this.createQueryBuilder('Password');

		if (user) {
			query.andWhere('Password.user = :user', { user });
		}

		if (username) {
			query.andWhere('Password.username = :username', { username });
		}

		if (password) {
			query.andWhere('Password.password = :password', { password });
		}

		if (search) {
			query.andWhere(
				'LOWER(Password.name) LIKE LOWER(:search) OR LOWER(Password.folder) LIKE LOWER(:search) OR LOWER(Password.url) LIKE LOWER(:url)',
				{ search: `%${search}%` },
			);
		}
		const Passwords = await query.getMany();
		return Passwords;
	}

	async getPasswordsByUser(user: string): Promise<Password[]> {
		const query = this.createQueryBuilder('Password');
		query.andWhere('Password.user = :user', { user });
		const Passwords = await query.getMany();
		return Passwords;
	}

	async getRecentPasswords(user: string): Promise<Password[]> {
		const query = this.createQueryBuilder('Password');
		query.andWhere('Password.user = :user', { user });
		query.orderBy('Password.lastUsedOn', 'DESC');
		query.limit(10);
		const Passwords = await query.getMany();
		return Passwords;
	}

	async createPassword(
		createPasswordDto: CreatePasswordDto,
	): Promise<Password> {
		const { user, username, password, name, folder, strength, notes, url } =
			createPasswordDto;

		const Password = this.create({
			user,
			username,
			password,
			name,
			folder,
			strength,
			notes,
			url,
		});

		await this.save(Password);
		return Password;
	}
}
