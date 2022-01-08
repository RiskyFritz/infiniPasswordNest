import { IsOptional, IsString } from 'class-validator';

export class GetPaymentMethodsFilterDto {
	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	search?: string;
}
