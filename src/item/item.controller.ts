import { Controller, Post, Body, UsePipes, ValidationPipe, InternalServerErrorException } from "@nestjs/common";
import { CreateItem } from "./dtos/request/CreateItem.dto";
import { ItemService } from "./item.service";
import { AddStock } from "./dtos/request/AddStock.dto";
import { ListItem } from "./dtos/request/ListItem.dto";

@Controller("item")
export class ItemController 
{
	private response = 
	{
		status: 500,
		message: "",
		data: {}
	}

	constructor(private itemService: ItemService) {}

	/**
	 * Adding a new Item
	 */
	@Post("create")
	@UsePipes(ValidationPipe)
	async create(@Body() createItem: CreateItem)
	{
		const result = await this.itemService.create(createItem);

		if (result)
		{
			this.response.status = 200;
			this.response.message = "New Item Created Successfully!";
			this.response.data = result;
		}
		else 
		{
			throw new InternalServerErrorException("New Item could not be created!");
		}

		return(this.response);
	}

	@Post("add")
	async add(@Body() addStock: AddStock)
	{
		const result = await this.itemService.add(addStock);

		if (result)
		{
			this.response.status = 200;
			this.response.message = "Item Stock Updated Successfully!";
			this.response.data = result;
		}
		else 
		{
			throw new InternalServerErrorException("Item stock could not be created!");
		}

		return(this.response);
	}

	@Post("list")
	@UsePipes(ValidationPipe)
	async list(@Body() listItem: ListItem)
	{
		this.response.data = await this.itemService.list(listItem);

		return(this.response);
	}
}