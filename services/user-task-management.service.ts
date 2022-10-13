"use strict";
import { Service, ServiceBroker } from "moleculer";
import { TasksManagementController } from "../src/task-management/tasksmanager.controller";

export default class UserTaskManagementService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "userTaskManagement",

			settings: {},

			hooks: {},

			actions: {
				create: {
					rest: "POST /createTaskforUser",
					params: {
						taskId: { type: "string", optional: true },
						userId: { type: "string", optional: true },
						status: { type: "string", optional: true },
					},

					handler(ctx: any) {
						this.createTaskforUser(ctx);
						broker.emit("userTaskManagement.create", ctx.params);
					},
				},

				setTasks: {
					rest: "PUT /setTask",
					params: {
						_id: { type: "string", optional: true },
						status: { type: "string", optional: true },
						taskenddate: { type: "string", optional: true },
					},

					handler: this.setTaskforUser,
				},
			},

			events: {},

			methods: {},
		});
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
}
