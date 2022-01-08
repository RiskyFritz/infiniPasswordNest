import { EntityRepository, Repository } from 'typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Folder } from './folder.entity';
import { GetFoldersFilterDto } from './dto/get-folders-filter.dto';

@EntityRepository(Folder)
export class FoldersRepository extends Repository<Folder> {
	async getFolders(filterDto: GetFoldersFilterDto): Promise<Folder[]> {
		const { user, search } = filterDto;

		const query = this.createQueryBuilder('Folder');

		if (user) {
			query.andWhere('Folder.user = :user', { user });
		}

		if (search) {
			query.andWhere('LOWER(Folder.folder) LIKE LOWER(:search)', {
				search: `%${search}%`,
			});
		}
		const Folders = await query.getMany();
		return Folders;
	}

	async getFoldersByUser(user: string): Promise<Folder[]> {
		const query = this.createQueryBuilder('Folder');
		query.andWhere('Folder.user = :user', { user });
		const Folders = await query.getMany();
		return Folders;
	}

	async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
		const { user, folder } = createFolderDto;

		const Folder = this.create({
			user,
			folder,
		});

		await this.save(Folder);
		return Folder;
	}
}
