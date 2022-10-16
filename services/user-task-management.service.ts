"use strict";
import { Service, ServiceBroker } from "moleculer";
import { TasksManagementController } from "../src/task-management/tasksmanager.controller";
import { setTask } from "../src/task-management/dto/set-task.dto";

export default class UserTaskManagementService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "userTaskManagement",

			settings: {},

			hooks: {
				before: {
					create: [this.hookCheckTaskUser],
				},
			},

			actions: {
				create: {
					rest: "POST /set-task",
					params: {
						taskId: { type: "string", optional: true },
						userId: { type: "string", optional: true },
						status: { type: "string", optional: true },
					},

					handler: this.createTaskforUser,
				},

				setTasks: {
					rest: "PUT /update-task",
					params: {
						_id: { type: "string", optional: true },
						status: { type: "string", optional: true },
						taskenddate: { type: "string", optional: true },
					},

					handler: this.setTaskforUser,
				},

				getTaskList: {
					rest: "GET /tasklist",
					params: {
						id: { type: "string", optional: true },
					},

					handler: this.getTasksListbyUserId,
				},

				getAllTask: {
					rest: "GET /getAllTask",
					params: {
						page: { type: "number", optional: false },
					},

					handler: this.getAllTask,
				},
			},

			events: {},

			methods: {},

			dependencies: ["nodechild"],
		});
	}

	public async hookCheckTaskUser(ctx): Promise<void> {
		const { taskId, userId, status }: setTask = ctx.params;

		const checkUser: boolean = await this.broker.call(
			"user.checkIdUser",
			ctx.params
		);

		const checkTask = await this.broker.call(
			"task.checkIdTask",
			ctx.params
		);

		if (checkUser === false || checkTask === false) {
			throw new Error("User or Task exits");
		}
	}

	public async createTaskforUser(ctx: any) {
		const { taskId, userId, status } = ctx.params;

		console.log(taskId, userId, status);

		const create = await TasksManagementController.createTaskforUser(
			taskId,
			userId,
			status
		);

		return create;
	}

	public async setTaskforUser(ctx: any) {
		const { _id, status, taskenddate } = ctx.params;

		const update = await TasksManagementController.setTaskforUser(
			_id,
			status,
			taskenddate
		);

		return update;
	}

	public async getTasksListbyUserId(ctx: any) {
		const { userId } = ctx.params;

		const listTask = await TasksManagementController.getTasksListbyUserId(
			userId
		);

		console.log("listTask -->", listTask);

		return listTask;
	}

	public async getAllTask(ctx: any) {
		const { page } = ctx.params;

		const result = await TasksManagementController.getAllTask(page);

		return result;
	}
}
