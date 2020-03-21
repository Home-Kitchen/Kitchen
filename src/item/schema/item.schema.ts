import * as mongoose from "mongoose";

export const ItemSchema = new mongoose.Schema
({
	organizationId: String,
	name: String,
	picture: 
	{
		type: String, 
		default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTFjYBCIe_AfnDCaoVeXl2XsLrzXkNaMsonOev_W6UWnz2ICOHC"
	},
	shortName: String,
	stocks: 
	[
		{
			weight: Number,
			quantity: Number,
			price: Number,
			totalWeight: Number,
			added: {type: Date, default: Date.now},
			userId: String
		}
	],
	status: {type: String, enum:["active", "inactive", "deleted"], default: "active"}
});