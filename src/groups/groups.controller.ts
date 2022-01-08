import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetGroupsFilterDto } from './dto/get-groups-filter.dto';

@Controller('groups')
export class GroupsController {
	constructor(private groupsService: GroupsService) {}

	@Get()
	async getGroups(@Query() filterDto: GetGroupsFilterDto): Promise<Group[]> {
		return await this.groupsService.getGroups(filterDto);
	}

	@Get('/:id')
	async getGroupById(@Param('id') id: string): Promise<Group> {
		return await this.groupsService.getGroupById(id);
	}

	@Get('/:user')
	async getGroupsByUser(@Param('user') user: string): Promise<Group[]> {
		return await this.groupsService.getGroupsByUser(user);
	}

	@Post()
	async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
		console.log(createGroupDto);
		return await this.groupsService.createGroup(createGroupDto);
	}

	@Delete('/:id')
	async deleteGroup(@Param('id') id: string): Promise<void> {
		return await this.groupsService.deleteGroup(id);
	}

	@Patch('/:id')
	async updateGroup(
		@Param('id') id: string,
		@Body() updateGroupDto: CreateGroupDto,
	): Promise<Group> {
		return await this.groupsService.updateGroup(id, updateGroupDto);
	}
}
