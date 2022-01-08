import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { PaymentMethodsService } from './paymentMethods.service';
import { PaymentMethod } from './paymentMethod.entity';
import { CreatePaymentMethodDto } from './dto/create-paymentMethods.dto';
import { GetPaymentMethodsFilterDto } from './dto/get-paymentMethods-filter.dto';

@Controller('paymentMethods')
export class PaymentMethodsController {
	constructor(private paymentMethodsService: PaymentMethodsService) {}

	@Get()
	async getPaymentMethods(
		@Query() filterDto: GetPaymentMethodsFilterDto,
	): Promise<PaymentMethod[]> {
		return await this.paymentMethodsService.getPaymentMethods(filterDto);
	}

	@Get('/:id')
	async getPaymentMethodById(
		@Param('id') id: string,
	): Promise<PaymentMethod> {
		return await this.paymentMethodsService.getPaymentMethodById(id);
	}

	@Get('/:user')
	async getPaymentMethodsByUser(
		@Param('user') user: string,
	): Promise<PaymentMethod[]> {
		return await this.paymentMethodsService.getPaymentMethodsByUser(user);
	}

	@Post()
	async createPaymentMethod(
		@Body() createPaymentMethodDto: CreatePaymentMethodDto,
	): Promise<PaymentMethod> {
		console.log(createPaymentMethodDto);
		return await this.paymentMethodsService.createPaymentMethod(
			createPaymentMethodDto,
		);
	}

	@Delete('/:id')
	async deletePaymentMethod(@Param('id') id: string): Promise<void> {
		return await this.paymentMethodsService.deletePaymentMethod(id);
	}

	// change paymentmethod name
	@Patch('/:id/name')
	async updatePaymentMethodName(
		@Param('id') id: string,
		@Body() updatePaymentMethodDto: CreatePaymentMethodDto,
	): Promise<PaymentMethod> {
		return await this.paymentMethodsService.updatePaymentMethodName(
			id,
			updatePaymentMethodDto,
		);
	}
}
