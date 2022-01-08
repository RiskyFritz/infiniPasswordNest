import { EntityRepository, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { GetGroupsFilterDto } from './dto/get-groups-filter.dto';

@EntityRepository(Group)
export class GroupsRepository extends Repository<Group> {
	async getGroups(filterDto: GetGroupsFilterDto): Promise<Group[]> {
		const { user, search } = filterDto;

		const query = this.createQueryBuilder('Group');

		if (user) {
			query.andWhere('Group.user = :user', { user });
		}

		if (search) {
			query.andWhere('LOWER(Group.group) LIKE LOWER(:search)', {
				search: `%${search}%`,
			});
		}
		const Groups = await query.getMany();
		return Groups;
	}

	async getGroupsByUser(user: string): Promise<Group[]> {
		const query = this.createQueryBuilder('Group');
		query.andWhere('Group.user = :user', { user });
		const Groups = await query.getMany();
		return Groups;
	}

	async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
		const { user, groupName, trustedAccounts } = createGroupDto;

		const Group = this.create({
			user,
			groupName,
			trustedAccounts,
		});

		await this.save(Group);
		return Group;
	}
}
