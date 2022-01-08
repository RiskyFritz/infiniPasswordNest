import { User } from 'src/auth/user.entity';
import { Column } from 'typeorm';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentMethod {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@ManyToOne((_type) => User, (user) => user.folders, { eager: false })
	user: string;
	@Column()
	name: string;
	@Column()
	folder: string;
	@Column()
	nameOnCard: string;
	@Column()
	cardNumber: number;
	@Column()
	expirationDate: Date;
	@Column()
	cvv: number;
	@Column()
	type: string;
	@Column()
	notes: string;
}
