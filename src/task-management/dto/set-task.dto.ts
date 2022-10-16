import mongoose from "mongoose";
import { TaskStatus } from "../schemas/tasksmanager.schema";
export class setTask {
	userId: mongoose.Types.ObjectId;
	taskId: mongoose.Types.ObjectId;
	status: string;
	taskstartdate?: string;
	taskenddate?: string;
}
