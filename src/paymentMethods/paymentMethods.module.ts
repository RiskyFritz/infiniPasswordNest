import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './paymentMethods.controller';
import { PaymentMethodsService } from './paymentMethods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodsRepository } from './paymentMethods.repository';

@Module({
	imports: [TypeOrmModule.forFeature([PaymentMethodsRepository])],
	controllers: [PaymentMethodsController],
	providers: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
