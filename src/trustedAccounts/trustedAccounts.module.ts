import { Module } from '@nestjs/common';
import { TrustedAccountsController } from './trustedAccounts.controller';
import { TrustedAccountsService } from './trustedAccounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrustedAccountsRepository } from './trustedAccounts.repository';

@Module({
	imports: [TypeOrmModule.forFeature([TrustedAccountsRepository])],
	controllers: [TrustedAccountsController],
	providers: [TrustedAccountsService],
})
export class TrustedAccountsModule {}
