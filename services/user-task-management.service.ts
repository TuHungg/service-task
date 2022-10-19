import { Service, ServiceBroker } from "moleculer";

import { TasksManagementController } from "../src/user-task-management/tasksmanager.controller";
import { updateTaskListDto } from "./../src/user-task-management/dto/set-task-list.dto";
import { setTaskListDto } from "./../src/user-task-management/dto/update-task-list";

export default class UserTaskManagementService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "user-task-management",

			settings: {},

			hooks: {
				before: {},
			},

			actions: {
				create: {
					params: {
						title: { type: "string", optional: true },
						context: { type: "string", optional: true },
						status: { type: "string", optional: true },
					},

					handler: this.createTaskforUser,
				},

				updateStatus: {
					params: {
						_id: { type: "string", optional: true },
						status: { type: "string", optional: true },
					},

					handler: this.updateStatus,
				},

				getTasksListbyUserId: {
					params: {
						id: { type: "string", optional: true },
					},

					handler: this.getTasksListbyUserId,
				},

				getTaskList: {
					params: {
						page: { type: "number", optional: false },
					},

					handler: this.getTaskList,
				},

				setTask: {
					params: {
						_id: { type: "string", optional: false },
						userId: { type: "string", optional: false },
					},

					handler: this.setTask,
				},
			},

			events: {
				"user.signin": {
					params: {
						username: "string",
						password: "string",
					},
					async handler(ctx: any) {
						console.log();

						this.logger.info(
							`User --> ${ctx.params.username} <-- Sign In In System`
						);
					},
				},
			},

			methods: {},

			dependencies: ["gateway"],
		});
	}

	public async createTaskforUser(ctx: any) {
		const { title, context, status } = ctx.params;

		const result = await TasksManagementController.createTaskItem(
			title,
			context,
			status
		);

		return result;
	}

	public async updateStatus(ctx: any) {
		const { _id, status } = ctx.params;

		const result = await TasksManagementController.updateStatus(
			_id,
			status
		);

		return result;
	}

	public async getTasksListbyUserId(ctx: any) {
		const { userId } = ctx.params;

		const listTask = await TasksManagementController.getTasksListbyUserId(
			userId
		);

		return listTask;
	}

	public async getTaskList(ctx: any) {
		const { page } = ctx.params;

		const result = await TasksManagementController.getAllTask(page);

		return result;
	}

	public async setTask(ctx: any) {
		const { _id, userId } = ctx.params;

		const result = await TasksManagementController.setTaskforUser(
			_id,
			userId
		);

		return result;
	}
}
