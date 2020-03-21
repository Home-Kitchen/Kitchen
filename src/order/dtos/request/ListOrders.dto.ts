import { IsNotEmpty } from "class-validator";

export class ListOrders
{
	@IsNotEmpty()
	organizationId: string
}