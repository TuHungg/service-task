import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { TasksManagementHandler } from "./tasksmanager.handler";
import { TasksManagement } from "./schemas/tasksmanager.schema";

@Controller()
export class TasksManagementController {
	public static tasksManagementHandler: TasksManagementHandler;

	public constructor(tasksManagementHandler: TasksManagementHandler) {
		TasksManagementController.tasksManagementHandler =
			tasksManagementHandler;
	}

	public static createTaskforUser(
		taskId: string,
		userId: string,
		status: string
	): Promise<string> {
		return TasksManagementController.tasksManagementHandler.createTaskforUser(
			taskId,
			userId,
			status
		);
	}

	public static setTaskforUser(
		_id: mongoose.Types.ObjectId,
		status: string,
		taskenddate: string
	): Promise<string> {
		return TasksManagementController.tasksManagementHandler.setTaskforUser(
			_id,
			status,
			taskenddate
		);
	}

	public static getTasksListbyUserId(
		userId: string
	): Promise<TasksManagement[]> {
		return TasksManagementController.tasksManagementHandler.getTaskListbyUserId(
			userId
		);
	}
}
