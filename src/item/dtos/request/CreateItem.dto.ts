import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateItem
{
	@IsNotEmpty()
	organizationId: string

	@IsNotEmpty()
	name: string
	
	shortName: string
		
	@ValidateNested({ each: true })
	@Type(() => Stock)
	stocks: Stock[]
}

class Stock 
{
	weight: number
	quantity: number
	price: number

	@IsNotEmpty()
	userId: string

	totalWeight: number
}