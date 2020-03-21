import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateOrganization } from "./dtos/request/CreateOrganization.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Organization } from "./inteface/organization.interface";
import { Model } from 'mongoose';

@Injectable()
export class OrganizationService 
{
	constructor(@InjectModel("Organization") private readonly organization: Model<Organization>) {}

	async create(createOrganization: CreateOrganization)
	{
		if (!await this.exists(createOrganization.name))
		{
			const result = await this.organization.create(createOrganization);
			return(result);
		}
		else 
		{
			throw new InternalServerErrorException("Organization Name not available");
		}
	}

	async exists(name: string)
	{
		const result = await this.organization.findOne({name: name});

		console.log(result);

		return((result) ? true : false);
	}
}
