import { Address } from 'src/addresses/address.entity';
import { Bank } from 'src/banks/bank.entity';
import { Password } from 'src/passwords/password.entity';
import { Folder } from 'src/folders/folder.entity';
import { Group } from 'src/groups/group.entity';
import { PaymentMethod } from 'src/paymentMethods/paymentMethod.entity';
import { SecureNote } from 'src/secureNotes/secureNote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrustedAccount } from '../trustedAccounts/trustedAccount.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@OneToMany((_type) => Password, (password) => password.user, {
		eager: true,
	})
	passwords: Password[];

	@OneToMany((_type) => Folder, (folder) => folder.user, {
		eager: true,
	})
	folders: Folder[];

	@OneToMany((_type) => Address, (address) => address.user, {
		eager: true,
	})
	addresses: Address[];

	@OneToMany((_type) => Bank, (bank) => bank.user, {
		eager: true,
	})
	banks: Bank[];

	@OneToMany((_type) => SecureNote, (secureNote) => secureNote.user, {
		eager: true,
	})
	secureNotes: SecureNote[];

	@OneToMany(
		(_type) => PaymentMethod,
		(paymentMethod) => paymentMethod.user,
		{
			eager: true,
		},
	)
	paymentMethods: PaymentMethod[];

	@OneToMany(
		(_type) => TrustedAccount,
		(trustedAccount) => trustedAccount.user,
		{
			eager: true,
		},
	)
	trustedAccounts: TrustedAccount[];

	@OneToMany((_type) => Group, (group) => group.user, {
		eager: true,
	})
	groups: Group[];
}
