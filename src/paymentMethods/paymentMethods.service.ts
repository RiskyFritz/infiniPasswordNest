/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-paymentMethods.dto';
import { GetPaymentMethodsFilterDto } from './dto/get-paymentMethods-filter.dto';
import { PaymentMethodsRepository } from './paymentMethods.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './paymentMethod.entity';
import { UpdatePaymentMethodDto } from './dto/update-paymentMethods.dto';

@Injectable()
export class PaymentMethodsService {
	constructor(
		@InjectRepository(PaymentMethodsRepository)
		private PaymentMethodsRepository: PaymentMethodsRepository,
	) {}

	async getPaymentMethods(
		filterDto: GetPaymentMethodsFilterDto,
	): Promise<PaymentMethod[]> {
		return await this.PaymentMethodsRepository.getPaymentMethods(filterDto);
	}

	async getPaymentMethodById(id: string): Promise<PaymentMethod> {
		const found = await this.PaymentMethodsRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(
				`PaymentMethod with ID "${id}" not found`,
			);
		}

		return found;
	}

	async getPaymentMethodsByUser(user: string): Promise<PaymentMethod[]> {
		return await this.PaymentMethodsRepository.getPaymentMethodsByUser(
			user,
		);
	}

	async createPaymentMethod(
		CreatePaymentMethodDto: CreatePaymentMethodDto,
	): Promise<PaymentMethod> {
		return await this.PaymentMethodsRepository.createPaymentMethod(
			CreatePaymentMethodDto,
		);
	}

	async deletePaymentMethod(id: string): Promise<void> {
		const result = await this.PaymentMethodsRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(
				`PaymentMethod with ID "${id}" not found`,
			);
		}
	}

	async updatePaymentMethodName(
		id: string,
		updatePaymentMethodDto: UpdatePaymentMethodDto,
	): Promise<PaymentMethod> {
		const paymentMethodRecord = await this.getPaymentMethodById(id);
		paymentMethodRecord.user = updatePaymentMethodDto.user;
		paymentMethodRecord.name = updatePaymentMethodDto.name;
		paymentMethodRecord.folder = updatePaymentMethodDto.folder;
		paymentMethodRecord.cardNumber = updatePaymentMethodDto.cardNumber;
		paymentMethodRecord.expirationDate =
			updatePaymentMethodDto.expirationDate;
		paymentMethodRecord.cvv = updatePaymentMethodDto.cvv;
		paymentMethodRecord.notes = updatePaymentMethodDto.notes;
		paymentMethodRecord.type = updatePaymentMethodDto.type;
		paymentMethodRecord.nameOnCard = updatePaymentMethodDto.nameOnCard;
		await this.PaymentMethodsRepository.save(paymentMethodRecord);
		return paymentMethodRecord;
	}
}
