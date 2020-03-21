import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Item } from "./interface/item.interface";
import { Model } from "mongoose";
import { CreateItem } from "./dtos/request/CreateItem.dto";
import { AddStock } from "./dtos/request/AddStock.dto";
import { ListItem } from "./dtos/request/ListItem.dto";

@Injectable()
export class ItemService 
{
	constructor(@InjectModel("Item") private readonly item: Model<Item>) {}

	async create(createItem: CreateItem)
	{
		// Getting the short name by using the first letters of each word
		if (createItem.shortName == "")
		{
			let shortName = createItem.name.match(/\b(\w)/g);
			createItem.shortName = shortName.join("");
		}

		createItem.stocks[0].price = createItem.stocks[0].price * createItem.stocks[0].quantity;
		createItem.stocks[0].totalWeight = createItem.stocks[0].weight * createItem.stocks[0].quantity;

		const result = await this.item.create(createItem);

		return(result);
	}
	
	async add(addStock: AddStock)
	{
		const stock = 
		{
			weight: addStock.weight,
			quantity: addStock.quantity,
			price: addStock.price,
			userId: addStock.userId			
		}

		const result = await this.item.updateOne
		(
			{_id: addStock.itemId, organizationId: addStock.organizationId},
			{
				"$push": 
				{
					"stocks": stock
				}
			}
		);

		return(result);
	}

	async list(listItem: ListItem)
	{
		const result = await this.item.find({status: "active", organizationId: listItem.organizationId}).select
		({
			_id: 1,
			name: 1,
			picture: 1
		});

		console.log(result);

		return(result);
	}
}