/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetGroupsFilterDto } from './dto/get-groups-filter.dto';
import { GroupsRepository } from './groups.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(GroupsRepository)
		private GroupsRepository: GroupsRepository,
	) {}

	async getGroups(filterDto: GetGroupsFilterDto): Promise<Group[]> {
		return await this.GroupsRepository.getGroups(filterDto);
	}

	async getGroupById(id: string): Promise<Group> {
		const found = await this.GroupsRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(`Group with ID "${id}" not found`);
		}

		return found;
	}

	async getGroupsByUser(user: string): Promise<Group[]> {
		return await this.GroupsRepository.getGroupsByUser(user);
	}

	async createGroup(CreateGroupDto: CreateGroupDto): Promise<Group> {
		return await this.GroupsRepository.createGroup(CreateGroupDto);
	}

	async deleteGroup(id: string): Promise<void> {
		const result = await this.GroupsRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Group with ID "${id}" not found`);
		}
	}

	async updateGroup(
		id: string,
		updateGroupDto: UpdateGroupDto,
	): Promise<Group> {
		const groupRecord = await this.getGroupById(id);
		groupRecord.groupName = updateGroupDto.groupName;
		groupRecord.trustedAccounts = updateGroupDto.trustedAccounts;
		await this.GroupsRepository.save(groupRecord);
		return groupRecord;
	}
}
