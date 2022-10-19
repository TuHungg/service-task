import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { TasksManagementHandler } from "./tasksmanager.handler";
import { TaskItem, TaskList } from "./schemas/tasksmanager.schema";

@Controller()
export class TasksManagementController {
	public static tasksManagementHandler: TasksManagementHandler;

	public constructor(tasksManagementHandler: TasksManagementHandler) {
		TasksManagementController.tasksManagementHandler =
			tasksManagementHandler;
	}

	public static createTaskItem(
		title: string,
		context: string,
		status: string
	): Promise<string> {
		return TasksManagementController.tasksManagementHandler.createTaskItem(
			title,
			context,
			status
		);
	}

	public static getTasksListbyUserId(
		userId: mongoose.Types.ObjectId
	): Promise<TaskList[]> {
		return TasksManagementController.tasksManagementHandler.getTaskListbyUserId(
			userId
		);
	}

	public static getAllTask(page: number): Promise<TaskList[]> {
		return TasksManagementController.tasksManagementHandler.getAllTask(
			page
		);
	}

	public static updateStatus(
		_id: mongoose.Types.ObjectId,
		status: string
	): Promise<string> {
		return TasksManagementController.tasksManagementHandler.updateStatus(
			_id,
			status
		);
	}

	public static checkDbduplicate(
		_id: mongoose.Types.ObjectId
	): Promise<TaskItem[]> {
		return TasksManagementController.tasksManagementHandler.checkDBDuplicate(
			_id
		);
	}

	public static findTask(_id: mongoose.Types.ObjectId): Promise<TaskItem[]> {
		return TasksManagementController.tasksManagementHandler.findTask(_id);
	}

	public static setTaskforUser(
		_id: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	) {
		return TasksManagementController.tasksManagementHandler.setTaskforUser(
			_id,
			userId
		);
	}
}
