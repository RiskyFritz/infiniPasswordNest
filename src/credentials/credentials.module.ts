import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsRepository } from './credentials.repository';

@Module({
	imports: [TypeOrmModule.forFeature([CredentialsRepository])],
	controllers: [CredentialsController],
	providers: [CredentialsService],
})
export class CredentialsModule {}
