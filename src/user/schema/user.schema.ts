import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema
({
	organizationId: String,
	name: String,
	username: String,
	password: String,
	status: {type: String, enum: ["active", "inactive", "deleted"], default: "active"},
	created: {type: Date, default: Date.now}
});