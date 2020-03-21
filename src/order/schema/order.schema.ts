import * as mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema
({
	organizationId: String,
	name: String,
	status: {type: String, enum: ["active", "inactive", "deleted", "completed"], default: "active"},
	created: {type: Date, default: Date.now},
	items: 
	[
		{
			itemId: String,
			weight: Number,
			quantity: Number,
			priority: {type: Number, default: 5},
			updated: {type: Date, default: Date.now}
		}
	]
});