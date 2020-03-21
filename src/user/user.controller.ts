import { Controller, Post, ValidationPipe, Body, UsePipes, InternalServerErrorException } from "@nestjs/common";
import { CreateUser } from "./dtos/request/CreateUser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController 
{
	private response = 
	{
		status: 500,
		message: "",
		data: {}
	}

	constructor(private userService: UserService) {}

	@Post("create")
	@UsePipes(ValidationPipe)
	async create(@Body() createUser: CreateUser)
	{
		const result = await this.userService.create(createUser);

		if (result)
		{
			this.response.status = 200;
			this.response.message = "User Created Successfully!";
			this.response.data = result;
		}
		else 
		{
			throw new InternalServerErrorException("Organization could not be created!");
		}

		return(this.response);
	}
}
