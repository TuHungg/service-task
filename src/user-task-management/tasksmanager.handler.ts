import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";

import {
	TaskItem,
	TaskList,
	TaskListSchema,
} from "./schemas/tasksmanager.schema";
import { TasksManagementRepository } from "./tasksmanager.repository";

export class TasksManagementHandler implements TasksManagementRepository {
	public constructor(
		@InjectModel(TaskList.name)
		private taskListModel: mongoose.Model<TaskList>
	) {}

	public async getTasksManagementModel() {
		if (!this.taskListModel) {
			this.taskListModel = mongoose.model("task_list", TaskListSchema);
		}

		return this.taskListModel;
	}

	public async createTaskItem(
		title: string,
		context: string,
		status: string
	): Promise<string> {
		const taskList = await this.getTasksManagementModel();

		const created = await taskList.create({ title, context, status });

		await created.save();

		return "Create Task Item successfully";
	}

	public async getTaskListbyUserId(
		userId: mongoose.Types.ObjectId
	): Promise<TaskList[]> {
		const model = await this.getTasksManagementModel();

		const taskList = await model.find({ user: userId }).exec();

		return taskList;
	}

	public async getAllTask(page: number): Promise<TaskList[]> {
		const model = await this.getTasksManagementModel();

		const result = model
			.find()
			.limit(5)
			.skip(page * 5);

		return result;
	}

	public async updateStatus(_id: mongoose.Types.ObjectId, status: string): Promise<string> {
		const model = await this.getTasksManagementModel();

		await model.updateOne(
			{ _id },
			{ status }
		);

		return "Update status successflly";
	}

	public async findTask(_id: mongoose.Types.ObjectId): Promise<TaskItem[]> {
		const model = await this.getTasksManagementModel();

		const result: TaskItem[] = await model.find({ "task_item._id": _id });

		return result;
	}

	public async checkDBDuplicate(
		_id: mongoose.Types.ObjectId
	): Promise<TaskItem[]> {
		const model = await this.getTasksManagementModel();

		const result: TaskItem[] = await model.find({ "task_item._id": _id });

		return result;
	}

	public async setTaskforUser(
		_id: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<string> {
		const model = await this.getTasksManagementModel();

		await model.updateOne({ _id }, { $push: { user: userId } });

		return "Set Task for user successfully";
	}
}
