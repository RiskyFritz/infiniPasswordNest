import { User } from 'src/auth/user.entity';
import { TrustedAccount } from 'src/trustedAccounts/trustedAccount.entity';
import {
	Column,
	ManyToMany,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
} from 'typeorm';

@Entity()
export class Group {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@ManyToOne((_type) => User, (user) => user.groups, { eager: false })
	user: string;
	@Column()
	groupName: string;
	@ManyToMany(
		(_type) => TrustedAccount,
		(trustedAccount) => trustedAccount.groups,
		{ eager: false },
	)
	trustedAccounts: string[];
}
