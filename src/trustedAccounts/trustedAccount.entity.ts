import { User } from 'src/auth/user.entity';
import { Group } from 'src/groups/group.entity';
import { Column, ManyToMany } from 'typeorm';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrustedAccount {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@ManyToOne((_type) => User, (user) => user.trustedAccounts, {
		eager: false,
	})
	user: string;
	@Column()
	trustedAccount: string;
	@ManyToMany((_type) => Group, (group) => group.trustedAccounts, {
		eager: true,
	})
	groups: Group[];
}
