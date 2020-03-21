import { Document } from "mongoose";

export interface Item extends Document 
{
	organizationId: string,
	name: string,
	picture: string,	
	shortName: string,
	stocks: 
	[
		{
			weight: number,
			quantity: number,
			price: number,			
			userId: string,
			totalWeight: number
		}
	]
}