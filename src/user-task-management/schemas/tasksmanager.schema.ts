/* eslint-disable max-classes-per-file */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";
// Import { Task } from "src/task/schemas/tasks.schema";

export type TaskListDocument = TaskList & Document;

export enum TaskStatus {
	DONE = "DONE",
	NOTDONE = "NOT DONE",
}

@Schema({ timestamps: true })
export class TaskItem {
	@Prop({ required: true })
	public title: string;

	@Prop({ required: true })
	public context: string;

	@Prop()
	public user: string[];

	@Prop({ required: true })
	public status: string;
}

@Schema({ timestamps: true })
export class TaskList {
	@Prop({ type: Array })
	@Prop({ required: true })
	public title: string;

	@Prop({ required: true })
	public context: string;

	@Prop()
	public user: string[];

	@Prop({ required: true })
	public status: string;
}

export const TaskListSchema = SchemaFactory.createForClass(TaskList);
