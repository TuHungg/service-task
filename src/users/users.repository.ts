import mongoose from "mongoose";
export interface UserRepository {
	signup(
		username: string,
		password: string,
		address?: string,
		age?: number
	): Promise<string>;

	signin(username: string, password: string): Promise<string>;

	update(
		_id: mongoose.Types.ObjectId,
		username: string,
		address: string,
		employees: number
	): Promise<string>;

	checkIdUser(id: string): Promise<boolean>;
}
