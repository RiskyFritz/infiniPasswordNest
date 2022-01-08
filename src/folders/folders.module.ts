import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoldersRepository } from './folders.repository';

@Module({
	imports: [TypeOrmModule.forFeature([FoldersRepository])],
	controllers: [FoldersController],
	providers: [FoldersService],
})
export class FoldersModule {}
