/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { GetFoldersFilterDto } from './dto/get-folders-filter.dto';
import { FoldersRepository } from './folders.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FoldersService {
	constructor(
		@InjectRepository(FoldersRepository)
		private FoldersRepository: FoldersRepository,
	) {}

	async getFolders(filterDto: GetFoldersFilterDto): Promise<Folder[]> {
		return await this.FoldersRepository.getFolders(filterDto);
	}

	async getFolderById(id: string): Promise<Folder> {
		const found = await this.FoldersRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(`Folder with ID "${id}" not found`);
		}

		return found;
	}

	async getFoldersByUser(user: string): Promise<Folder[]> {
		return await this.FoldersRepository.getFoldersByUser(user);
	}

	async createFolder(CreateFolderDto: CreateFolderDto): Promise<Folder> {
		return await this.FoldersRepository.createFolder(CreateFolderDto);
	}

	async deleteFolder(id: string): Promise<void> {
		const result = await this.FoldersRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Folder with ID "${id}" not found`);
		}
	}

	async updateFolderName(
		id: string,
		updateFolderDto: UpdateFolderDto,
	): Promise<Folder> {
		const folderRecord = await this.getFolderById(id);
		folderRecord.folder = updateFolderDto.folder;
		await this.FoldersRepository.save(folderRecord);
		return folderRecord;
	}
}
