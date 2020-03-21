import { Document } from "mongoose";

export interface Organization extends Document 
{
	name: string,
	address: string,
	status: string,
	created: Date
}