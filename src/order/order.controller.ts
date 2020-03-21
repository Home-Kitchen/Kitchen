import { Controller, Post, UsePipes, ValidationPipe, Body } from "@nestjs/common";
import { CreateOrder } from "./dtos/request/CreateOrder.dto";
import { OrderService } from "./order.service";
import { AddOrderItem } from "./dtos/request/AddOrderItem.dto";
import { ListOrders } from "./dtos/request/ListOrders.dto";
import { ListItems } from "./dtos/request/ListItems.dto";
import { UpdateOrderStatus } from "./dtos/request/UpdateStatus.dto";

@Controller("order")
export class OrderController 
{
	private response = 
	{
		status: 500,
		message: "",
		data: {}
	}

	constructor(private orderService: OrderService) {}

	@Post("list")
	@UsePipes(ValidationPipe)
	async list(@Body() listOrders: ListOrders)
	{
		const result = await this.orderService.list(listOrders);

		if(result)
		{
			this.response.status = 200;
			this.response.message = "Orders Fetched!";
			this.response.data = result;
		}

		return(this.response);
	}

	@Post("listItems")
	@UsePipes(ValidationPipe)
	async listItems(@Body() listItems: ListItems)
	{
		const result = await this.orderService.listItems(listItems);

		if (result)
		{
			this.response.status = 200;
			this.response.message = "Order Items Fetched!";
			this.response.data = result;
		}

		return(this.response);
	}

	@Post("create")
	@UsePipes(ValidationPipe)
	async create(@Body() createOrder: CreateOrder)
	{
		this.response.data = await this.orderService.create(createOrder);
		return(this.response);
	}

	@Post("add")
	@UsePipes(ValidationPipe)
	async add(@Body() addOrderItem: AddOrderItem)
	{
		const message = await this.orderService.add(addOrderItem);

		this.response.message = message;
		return(this.response);
	}

	@Post("updateStatus")
	@UsePipes(ValidationPipe)
	async updateStatus(@Body() updateOrderStatus: UpdateOrderStatus)
	{
		this.response.status = 200;
		this.response.message = await this.orderService.updateStatus(updateOrderStatus);

		return(this.response);
	}
}
