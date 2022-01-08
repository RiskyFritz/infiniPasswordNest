import { User } from 'src/auth/user.entity';
import { Group } from 'src/groups/group.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Password {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@ManyToOne((_type) => User, (user) => user.passwords, { eager: false })
	user: string;
	@Column()
	username: string;
	@Column()
	password: string;
	@Column()
	name: string;
	@Column()
	folder: string;
	@Column()
	url: string;
	@Column()
	notes: string;
	@Column()
	strength: number;
	@CreateDateColumn({ type: 'timestamptz' })
	createdOn: Date;
	@UpdateDateColumn({ type: 'timestamptz' })
	lastUpdatedOn: Date;
	@ManyToMany((_type) => Group, (group) => group.passwords, {
		eager: false,
	})
	groups: Group[];
}
