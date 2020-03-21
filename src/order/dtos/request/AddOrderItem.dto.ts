import { IsNotEmpty } from "class-validator";

export class AddOrderItem
{
	@IsNotEmpty()
	organizationId: string

	@IsNotEmpty()
	orderId: string

	@IsNotEmpty()
	itemId: string

	@IsNotEmpty()
	weight: number

	@IsNotEmpty()
	quantity: number
}