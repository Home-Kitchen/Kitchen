import { Document } from "mongoose";

export interface Order extends Document 
{
	organizationId: string,
	name: string,
	items: 
	[
		{
			itemId: String,
			weight: Number,
			quantity: Number
		}
	]
}