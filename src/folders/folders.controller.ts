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
import { FoldersService } from './folders.service';
import { Folder } from './folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { GetFoldersFilterDto } from './dto/get-folders-filter.dto';

@Controller('folders')
export class FoldersController {
	constructor(private foldersService: FoldersService) {}

	@Get()
	async getFolders(
		@Query() filterDto: GetFoldersFilterDto,
	): Promise<Folder[]> {
		return await this.foldersService.getFolders(filterDto);
	}

	@Get('/:id')
	async getFolderById(@Param('id') id: string): Promise<Folder> {
		return await this.foldersService.getFolderById(id);
	}

	@Get('/:user')
	async getFoldersByUser(@Param('user') user: string): Promise<Folder[]> {
		return await this.foldersService.getFoldersByUser(user);
	}

	@Post()
	async createFolder(
		@Body() createFolderDto: CreateFolderDto,
	): Promise<Folder> {
		console.log(createFolderDto);
		return await this.foldersService.createFolder(createFolderDto);
	}

	@Delete('/:id')
	async deleteFolder(@Param('id') id: string): Promise<void> {
		return await this.foldersService.deleteFolder(id);
	}

	// change folder name
	@Patch('/:id/name')
	async updateFolderName(
		@Param('id') id: string,
		@Body() updateFolderDto: CreateFolderDto,
	): Promise<Folder> {
		return await this.foldersService.updateFolderName(id, updateFolderDto);
	}
}
