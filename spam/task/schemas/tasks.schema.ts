import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
	@Prop({ required: true })
	public taskId: string;

	@Prop({ required: true })
	public taskname: string;

	@Prop({ required: true })
	public context: string;

	@Prop({ type: () => [String] })
	public user: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
