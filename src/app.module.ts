import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import Config from 'src/constants';

@Module({
	  
	imports: 
  	[
		MongooseModule.forRoot(Config.database.mongo.local, {useNewUrlParser: true, useUnifiedTopology: true}),
	  	OrganizationModule,
	  	UserModule,
	  	ItemModule,
	  	OrderModule
	],
  	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
