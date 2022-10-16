import { TaskStatus } from "../schemas/tasksmanager.schema";
export class updateTaskDto {
	status: TaskStatus;
	datecreated?: string;
}
