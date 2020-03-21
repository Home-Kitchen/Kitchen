import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { OrganizationSchema } from "./schema/organization.schema";

@Module({

	imports: 
	[
		MongooseModule.forFeature([{name: "Organization", schema: OrganizationSchema}])
	],
  	controllers: [OrganizationController],
  	providers: [OrganizationService]
})
export class OrganizationModule {}
