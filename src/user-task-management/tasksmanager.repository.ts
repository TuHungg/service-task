import mongoose from "mongoose";
import { TaskItem, TaskList } from "./schemas/tasksmanager.schema";

export interface TasksManagementRepository {
	createTaskItem(
		title: string,
		context: string,
		status: string
	): Promise<string>;

	getTaskListbyUserId(userId: mongoose.Types.ObjectId): Promise<TaskList[]>;

	getAllTask(page: number): Promise<TaskList[]>;

	updateStatus(_id: mongoose.Types.ObjectId, status: string): Promise<string>;

	findTask(_id: mongoose.Types.ObjectId): Promise<TaskItem[]>;

	setTaskforUser(
		_id: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<string>;
}
