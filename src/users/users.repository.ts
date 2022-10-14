import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./schemas/users.schemas";
export interface UserRepository {
	signup(
		username: string,
		password: string,
		address?: string,
		age?: number
	): Promise<string>;

	verifyToken(token: string): JwtPayload | string;

	signin(username: string, password: string): Promise<string>;

	update(
		_id: mongoose.Types.ObjectId,
		username: string,
		address: string,
		employees: number
	): Promise<string>;

	checkIdUser(id: string): Promise<boolean>;

	getAllUser(): Promise<User[]>;
}
