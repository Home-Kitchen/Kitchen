import * as mongoose from "mongoose";

export const OrganizationSchema = new mongoose.Schema
({
	name: String,
	address: String,
	status: {type: String, enum: ["active", "inactive", "deleted"], default: "active"},
	created: {type: Date, default: Date.now}
});