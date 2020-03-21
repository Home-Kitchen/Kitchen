import { IsNotEmpty } from "class-validator";

export class UpdateOrderStatus
{
	@IsNotEmpty()
	organizationId: string

	@IsNotEmpty()
	orderId: string

	@IsNotEmpty()
	status: string
}