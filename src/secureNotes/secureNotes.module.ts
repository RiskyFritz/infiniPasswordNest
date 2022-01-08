import { Module } from '@nestjs/common';
import { SecureNotesController } from './secureNotes.controller';
import { SecureNotesService } from './secureNotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecureNotesRepository } from './secureNotes.repository';

@Module({
	imports: [TypeOrmModule.forFeature([SecureNotesRepository])],
	controllers: [SecureNotesController],
	providers: [SecureNotesService],
})
export class SecureNotesModule {}
