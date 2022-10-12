import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot("mongodb://localhost:27017/neox"),
		UsersModule,
	],
})
export class AppModule {}
