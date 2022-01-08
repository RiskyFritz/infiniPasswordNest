import { User } from 'src/auth/user.entity';
import { Column, CreateDateColumn } from 'typeorm';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bank {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@ManyToOne((_type) => User, (user) => user.banks, { eager: false })
	user: string;
	@Column()
	name: string;
	@Column()
	folder: string;
	@Column()
	bankName: string;
	@Column()
	accountType: string;
	@Column()
	routingNumber: string;
	@Column()
	accountNumber: string;
	@Column()
	bankWebsite: string;
	@Column()
	bankPhone: string;
	@Column()
	notes: string;
	@CreateDateColumn({ type: 'timestamptz' })
	createdOn: Date;
}
