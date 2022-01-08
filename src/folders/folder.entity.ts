import { User } from 'src/auth/user.entity';
import { Column } from 'typeorm';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Folder {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@ManyToOne((_type) => User, (user) => user.folders, { eager: false })
	user: string;
	@Column()
	folder: string;
}
