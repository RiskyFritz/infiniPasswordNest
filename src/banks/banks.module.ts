import { Module } from '@nestjs/common';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksRepository } from './banks.repository';

@Module({
	imports: [TypeOrmModule.forFeature([BanksRepository])],
	controllers: [BanksController],
	providers: [BanksService],
})
export class BanksModule {}
