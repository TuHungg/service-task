import mongoose from "mongoose";
import { TasksManagement } from "./schemas/tasksmanager.schema";

export interface TasksManagementRepository {
	createTaskforUser(
		taskId: string,
		userId: string,
		status: string
	): Promise<string>;

	getTaskListbyUserId(userId: string): Promise<TasksManagement[]>;

	setTaskforUser(
		_id: mongoose.Types.ObjectId,
		status: string,
		taskenddate: string
	): Promise<string>;
}
