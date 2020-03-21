import { IsNotEmpty } from "class-validator";

export class CreateUser 
{
	@IsNotEmpty()
	organizationId: string
	
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	username: string

	@IsNotEmpty()
	password: string
}