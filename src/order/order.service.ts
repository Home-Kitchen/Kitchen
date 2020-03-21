import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "./interface/order.interface";
import { Model } from "mongoose";
import { CreateOrder } from "./dtos/request/CreateOrder.dto";
import { AddOrderItem } from "./dtos/request/AddOrderItem.dto";
import { ListOrders } from "./dtos/request/ListOrders.dto";
import { ListItems } from "./dtos/request/ListItems.dto";
import { UpdateOrderStatus } from "./dtos/request/UpdateStatus.dto";

@Injectable()
export class OrderService 
{
	constructor(@InjectModel("Order") private readonly order: Model<Order>) {}

	async create(createOrder: CreateOrder)
	{
		if (!await this.exists("name", createOrder.name, createOrder.organizationId))
		{
			const result = await this.order.create(createOrder);

			return(result);	
		}
		else 
		{
			throw new InternalServerErrorException("Order Name has to be unique!");
		}		
	}

	async exists(field: string, value: string, organizationId: string)
	{
		const options = 
		{
			organizationId: organizationId,
			status: "active"
		};

		options[field] = value;

		const result = await this.order.findOne(options);		

		return(result? true: false);
	}

	async add(addOrderItem: AddOrderItem)
	{
		let result = "";
		let message = "Order Item Updated!";

		result = await this.order.updateOne
		(
			{
				organizationId: addOrderItem.organizationId,
				_id: addOrderItem.orderId,
				status: "active",
				"items.itemId": addOrderItem.itemId
			},
			{
				$set: 
				{
					"items.$.weight": addOrderItem.weight,
					"items.$.quantity": addOrderItem.quantity,
					"items.$.updated": Date.now().toString()
				}
			}
		);		

		const parsedResult = JSON.parse(JSON.stringify(result));

		if (parsedResult.nModified == 0)
		{
			const orderItem = 
			{
				itemId: addOrderItem.itemId,
				weight: addOrderItem.weight,
				quantity: addOrderItem.quantity
			}

			result = await this.order.updateOne
			(
				{
					organizationId: addOrderItem.organizationId,
					_id: addOrderItem.orderId,
					status: "active",					
				},
				{
					$push: 
					{
						"items": orderItem
					}
				}
			);

			message = "New Order Item Added!";
		}		

		return(message);
	}

	async list(listOrders: ListOrders)
	{
		return(await this.order.find({organizationId: listOrders.organizationId, status: "active"}).select({items:0}));
	}

	async listItems(listItems: ListItems)
	{
		const result = await this.order.findOne
		({
			organizationId: listItems.organizationId,
			_id: listItems.orderId,
			status: "active"
		}).select
		({
			items: 1,
			_id: 0		
		});

		console.log(result);

		return(result);
	}

	async updateStatus(updateOrderStatus: UpdateOrderStatus)
	{
		let message = "";

		const result = await this.order.updateOne
		(
			{
				organizationId: updateOrderStatus.organizationId,
				_id: updateOrderStatus.orderId
			},
			{
				$set: 
				{
					status: updateOrderStatus.status
				}
			}
		);

		const parsedResult = JSON.parse(JSON.stringify(result));

		if (parsedResult.nModified == 1)
		{
			message = "Order Status Updated!";
		}

		return(message);
	}
}
