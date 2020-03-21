import { IsNotEmpty } from 'class-validator';

export class CreateOrganization 
{	
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	address: string;
}