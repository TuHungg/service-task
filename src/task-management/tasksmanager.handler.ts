import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TasksManagementRepository } from "./tasksmanager.repository";
import {
	TasksManagementSchema,
	TasksManagement,
} from "./schemas/tasksmanager.schema";

@Injectable()
export class TasksManagementHandler implements TasksManagementRepository {
	public constructor(
		@InjectModel(TasksManagement.name)
		private tasksManagementModel: mongoose.Model<TasksManagement>
	) {}

	public async getTasksManagementModel() {
		if (!this.tasksManagementModel) {
			this.tasksManagementModel = mongoose.model(
				"tasksManagement",
				TasksManagementSchema
			);
		}

		return this.tasksManagementModel;
	}

	public async createTaskforUser(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId,
		status: string
	): Promise<string> {
		const model = await this.getTasksManagementModel();

		const taskstartdate = new Date().toLocaleDateString();

		const taskenddate = "01/01/2022";

		if (status === "doing" || status === "done") {
			const setedTask = await model.create({
				taskId,
				userId,
				status,
				taskstartdate,
				taskenddate,
			});

			await setedTask.save();

			return "Set task for user successfully";
		}

		return "Set Task Failed";
	}

	public async setTaskforUser(
		_id: mongoose.Types.ObjectId,
		status: string,
		taskenddate: string
	): Promise<string> {
		const model = await this.getTasksManagementModel();

		await model.updateOne({ _id }, { status, taskenddate });

		return "Set task sucessfully";
	}

	public async getTaskListbyUserId(
		userId: mongoose.Types.ObjectId
	): Promise<TasksManagement[]> {
		const model = await this.getTasksManagementModel();

		const taskList = await model.find({ userId }).exec();

		return taskList;
	}

	public async getAllTask(page: number): Promise<TasksManagement[]> {
		const model = await this.getTasksManagementModel();

		const result = model
			.find()
			.limit(5)
			.skip(page * 5);

		return result;
	}
}
