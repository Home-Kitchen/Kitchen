import { IsNotEmpty } from "class-validator";

export class CreateOrder
{
	@IsNotEmpty()
	organizationId: string

	@IsNotEmpty()
	name: string
}