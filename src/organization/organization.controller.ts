import { Controller, Post, Body, UsePipes, ValidationPipe, InternalServerErrorException } from "@nestjs/common";
import { CreateOrganization } from "./dtos/request/CreateOrganization.dto";
import { OrganizationService } from "./organization.service";

@Controller("organization")
export class OrganizationController 
{
	private response = 
	{
		status: 500,
		message: "",
		data: {}
	}

	constructor(private readonly organizationService: OrganizationService) {}

	@Post("create")
	@UsePipes(ValidationPipe)
	async createOrganization(@Body() createOrganization: CreateOrganization)
	{
		console.log(createOrganization);

		const result = await this.organizationService.create(createOrganization);

		if (result)
		{
			this.response.status = 200;
			this.response.message = "Organization Created Successfully!";
			this.response.data = result;
		}
		else 
		{
			throw new InternalServerErrorException("Organization could not be created!");
		}

		return(this.response);
	}	
}
