import { EntityRepository, Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-paymentMethods.dto';
import { PaymentMethod } from './paymentMethod.entity';
import { GetPaymentMethodsFilterDto } from './dto/get-paymentMethods-filter.dto';

@EntityRepository(PaymentMethod)
export class PaymentMethodsRepository extends Repository<PaymentMethod> {
	async getPaymentMethods(
		filterDto: GetPaymentMethodsFilterDto,
	): Promise<PaymentMethod[]> {
		const { user, search } = filterDto;

		const query = this.createQueryBuilder('PaymentMethod');

		if (user) {
			query.andWhere('PaymentMethod.user = :user', { user });
		}

		if (search) {
			query.andWhere(
				'LOWER(PaymentMethod.paymentmethod) LIKE LOWER(:search)',
				{
					search: `%${search}%`,
				},
			);
		}
		const PaymentMethods = await query.getMany();
		return PaymentMethods;
	}

	async getPaymentMethodsByUser(user: string): Promise<PaymentMethod[]> {
		const query = this.createQueryBuilder('PaymentMethod');
		query.andWhere('PaymentMethod.user = :user', { user });
		const PaymentMethods = await query.getMany();
		return PaymentMethods;
	}

	async createPaymentMethod(
		createPaymentMethodDto: CreatePaymentMethodDto,
	): Promise<PaymentMethod> {
		const {
			user,
			name,
			folder,
			cardNumber,
			expirationDate,
			cvv,
			nameOnCard,
			type,
			notes,
		} = createPaymentMethodDto;

		const PaymentMethod = this.create({
			user,
			name,
			folder,
			cardNumber,
			expirationDate,
			cvv,
			nameOnCard,
			type,
			notes,
		});

		await this.save(PaymentMethod);
		return PaymentMethod;
	}
}
