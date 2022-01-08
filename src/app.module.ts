import { Module } from '@nestjs/common';
import { PasswordsModule } from './passwords/password.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SecureNotesModule } from './secureNotes/secureNotes.module';
import { PaymentMethodsModule } from './paymentMethods/paymentMethods.module';
import { BanksModule } from './banks/banks.module';
import { FoldersModule } from './folders/folders.module';
import { AddressesModule } from './addresses/addresses.module';
import { GroupsModule } from './groups/groups.module';
import { TrustedAccountsModule } from './trustedAccounts/trustedAccounts.module';

@Module({
	imports: [
		AuthModule,
		PasswordsModule,
		SecureNotesModule,
		PaymentMethodsModule,
		BanksModule,
		FoldersModule,
		AddressesModule,
		GroupsModule,
		TrustedAccountsModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'pass-key-manager',
			autoLoadEntities: true,
			synchronize: true,
		}),
	],
})
export class AppModule {}
