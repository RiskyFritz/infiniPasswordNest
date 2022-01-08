import { EntityRepository, Repository } from 'typeorm';
import { CreateCredentialDto } from '../credentials/dto/create-credential.dto';
import { Credential } from './credential.entity';
import { GetCredentialsFilterDto } from '../credentials/dto/get-credentials-filter.dto';

@EntityRepository(Credential)
export class CredentialsRepository extends Repository<Credential> {
	async getCredentials(
		filterDto: GetCredentialsFilterDto,
	): Promise<Credential[]> {
		const { user, username, password, search } = filterDto;

		const query = this.createQueryBuilder('Credential');

		if (user) {
			query.andWhere('Credential.user = :user', { user });
		}

		if (username) {
			query.andWhere('Credential.username = :username', { username });
		}

		if (password) {
			query.andWhere('Credential.password = :password', { password });
		}

		if (search) {
			query.andWhere(
				'LOWER(Credential.name) LIKE LOWER(:search) OR LOWER(Credential.folder) LIKE LOWER(:search) OR LOWER(Credential.url) LIKE LOWER(:url)',
				{ search: `%${search}%` },
			);
		}
		const Credentials = await query.getMany();
		return Credentials;
	}

	async getCredentialsByUser(user: string): Promise<Credential[]> {
		const query = this.createQueryBuilder('Credential');
		query.andWhere('Credential.user = :user', { user });
		const Credentials = await query.getMany();
		return Credentials;
	}

	async getRecentCredentials(user: string): Promise<Credential[]> {
		const query = this.createQueryBuilder('Credential');
		query.andWhere('Credential.user = :user', { user });
		query.orderBy('Credential.lastUsedOn', 'DESC');
		query.limit(10);
		const Credentials = await query.getMany();
		return Credentials;
	}

	async createCredential(
		createCredentialDto: CreateCredentialDto,
	): Promise<Credential> {
		const { user, username, password, name, folder, strength, notes, url } =
			createCredentialDto;

		const Credential = this.create({
			user,
			username,
			password,
			name,
			folder,
			strength,
			notes,
			url,
		});

		await this.save(Credential);
		return Credential;
	}
}
