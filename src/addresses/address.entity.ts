import { User } from 'src/auth/user.entity';
import { Column } from 'typeorm';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressTitle } from './address.title-enum';

@Entity()
export class Address {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@ManyToOne((_type) => User, (user) => user.addresses, { eager: false })
	user: string;
	@Column()
	name: string;
	@Column()
	folder: string;
	@Column()
	title: AddressTitle;
	@Column()
	firstName: string;
	@Column()
	lastName: string;
	@Column()
	company: string;
	@Column()
	address: string;
	@Column()
	address2: string;
	@Column()
	city: string;
	@Column()
	state: string;
	@Column()
	zip: string;
	@Column()
	country: string;
	@Column()
	phone: string;
	@Column()
	notes: string;
}
