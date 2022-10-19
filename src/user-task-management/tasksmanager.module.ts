import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksManagementHandler } from "../user-task-management/tasksmanager.handler";
import { TaskList, TaskListSchema } from "./schemas/tasksmanager.schema";
import { TasksManagementController } from "./tasksmanager.controller";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TaskList.name, schema: TaskListSchema },
		]),
	],
	controllers: [TasksManagementController],
	providers: [TasksManagementHandler],
})
export class TasksManagerModule {}
