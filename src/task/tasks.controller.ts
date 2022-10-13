import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { TasksHandler } from "./tasks.handler";

@Controller()
export class TasksController {
	public static tasksHandler: TasksHandler;

	public constructor(tasksHandler: TasksHandler) {
		TasksController.tasksHandler = tasksHandler;
	}

	public static async createTask(
		taskname: string,
		context: string,
		status: string
	): Promise<string> {

		console.log("handler", taskname, context, status);

		return TasksController.tasksHandler.createTask(
			taskname,
			context,
			status
		);
	}

	public static update(
		taskId: mongoose.Types.ObjectId,
		taskname?: string,
		context?: string,
		status?: string,
		datecreated?: string
	): Promise<string> {
		return TasksController.tasksHandler.update(
			taskId,
			taskname,
			context,
			status,
			datecreated
		);
	}

	public async delete(taskId: mongoose.Types.ObjectId): Promise<string> {
		return TasksController.tasksHandler.delete(taskId);
	}
}
