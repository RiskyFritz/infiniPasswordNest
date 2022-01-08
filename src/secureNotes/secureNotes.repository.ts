import { EntityRepository, Repository } from 'typeorm';
import { CreateSecureNoteDto } from './dto/create-SecureNote.dto';
import { SecureNote } from './secureNote.entity';
import { GetSecureNotesFilterDto } from './dto/get-SecureNote-filter.dto';

@EntityRepository(SecureNote)
export class SecureNotesRepository extends Repository<SecureNote> {
	async getSecureNotes(
		filterDto: GetSecureNotesFilterDto,
	): Promise<SecureNote[]> {
		const { user, search } = filterDto;

		const query = this.createQueryBuilder('SecureNote');

		if (user) {
			query.andWhere('SecureNote.user = :user', { user });
		}

		if (search) {
			query.andWhere('LOWER(SecureNote.name) LIKE LOWER(:search)', {
				search: `%${search}%`,
			});
		}
		const SecureNotes = await query.getMany();
		return SecureNotes;
	}

	async getSecureNotesByUser(user: string): Promise<SecureNote[]> {
		const query = this.createQueryBuilder('SecureNote');
		query.andWhere('SecureNote.user = :user', { user });
		const SecureNotes = await query.getMany();
		return SecureNotes;
	}

	async createSecureNote(
		createSecureNoteDto: CreateSecureNoteDto,
	): Promise<SecureNote> {
		const { user, name, folder, notes } = createSecureNoteDto;

		const SecureNote = this.create({
			user,
			name,
			folder,
			notes,
		});

		await this.save(SecureNote);
		return SecureNote;
	}
}
