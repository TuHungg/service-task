import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true, unique: true })
	userId: string;

	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ type: String, required: true })
	password: string;

	@Prop({ default: "" })
	refreshToken: string;

	@Prop()
	address: string;

	@Prop()
	age: number;

	@Prop({ type: String, default: "user" })
	role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
