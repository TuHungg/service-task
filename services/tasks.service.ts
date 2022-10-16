"use strict";
import { Service, ServiceBroker } from "moleculer";
import { TasksController } from "../src/task/tasks.controller";

export default class TasksService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "task",

			settings: {},

			hooks: {},

			actions: {
				create: {
					rest: "POST /created-task",

					params: {
						taskname: { type: "string", optional: false },
						context: { type: "string", optional: false },
						status: { type: "string", optional: false },
					},
					handler: this.create,
				},

				update: {
					rest: "PUT /update-task",

					params: {
						taskId: { type: "string", optional: false },
						taskname: { type: "string", optional: true },
						context: { type: "string", optional: true },
						status: { type: "string", optional: true },
						datecreated: { type: "string", optional: true },
					},

					handler: this.update,
				},

				getAll: {
					rest: "GET /findAll",

					handler: this.getAllTask,
				},

				async checkIdTask(cxt: any) {
					const result = await this.checkTask(cxt);

					console.log("check Task: ", result);

					return result;
				},
			},

			events: {},

			methods: {},
			/**
			 * Loading sample data to the collection.
			async afterConnected() {
			 await this.adapter.collection.createIndex({ name: 1 });
			},
			 */
			dependencies: ["nodechild"],
		});
	}

	public async checkTask(ctx: any) {
		const { taskId } = ctx.params;

		const result: boolean = await TasksController.checkIdTask(taskId);

		return result;
	}

	private async create(ctx: any) {
		const { taskname, context, status } = ctx.params;

		const creted = await TasksController.createTask(
			taskname,
			context,
			status
		);

		return creted;
	}

	private async update(ctx: any) {
		const { taskId, taskname, context, status, datecreated } = ctx.params;

		const updateTask = await TasksController.update(
			taskId,
			taskname,
			context,
			status,
			datecreated
		);

		return updateTask;
	}

	private async getAllTask() {
		const resulst = await TasksController.getAllTask();

		return resulst;
	}
}
