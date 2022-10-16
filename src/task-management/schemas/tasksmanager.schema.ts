import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";

export type TasksManagementDocument = TasksManagement & Document;

@Schema({ timestamps: true })
export class TasksManagement {
	@Prop({ type: String, required: true })
	taskId: mongoose.Types.ObjectId;

	@Prop({ type: String, required: true })
	userId: mongoose.Types.ObjectId;

	@Prop({ type: String, required: true })
	status: string;

	@Prop({ type: String, required: true })
	taskstartdate: string;

	@Prop({ type: String, required: true })
	taskenddate: string;
}

export const TasksManagementSchema =
	SchemaFactory.createForClass(TasksManagement);
