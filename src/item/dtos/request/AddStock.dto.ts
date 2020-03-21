import { IsNotEmpty } from "class-validator"

export class AddStock
{	
	@IsNotEmpty()
	organizationId: string

	@IsNotEmpty()
	itemId: string

	@IsNotEmpty()
	weight: number

	@IsNotEmpty()
	quantity: number

	@IsNotEmpty()
	price: number

	@IsNotEmpty()		
	userId: string	
}