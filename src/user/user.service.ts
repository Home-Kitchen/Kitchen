import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUser } from "./dtos/request/CreateUser.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./interface/user.interface";

@Injectable()
export class UserService 
{
	constructor(@InjectModel("User") private readonly user: Model<User>) {}

	async create(createUser: CreateUser)
	{
		if (!await this.exists("username", createUser.username))
		{
			return(await this.user.create(createUser));
		}
		else 
		{
			throw new InternalServerErrorException("Username not available!");
		}
	}

	async exists(field: string, value: string)
	{
		const options = {};
		options[field] = value;

		const result = await this.user.findOne(options);

		console.log(result);

		return((result) ? true : false);
	}
}
