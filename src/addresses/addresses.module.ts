import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesRepository } from './addresses.repository';

@Module({
	imports: [TypeOrmModule.forFeature([AddressesRepository])],
	controllers: [AddressesController],
	providers: [AddressesService],
})
export class AddressesModule {}
