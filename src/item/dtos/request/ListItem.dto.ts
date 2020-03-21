import { IsNotEmpty } from "class-validator";

export class ListItem
{
	@IsNotEmpty()
	organizationId: string
}