import { IsNotEmpty } from "class-validator";

export class ListItems
{
	@IsNotEmpty()
	organizationId: string

	@IsNotEmpty()
	orderId: string
}