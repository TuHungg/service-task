import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { UsersHandler } from "./users.handler";

@Controller()
export class UsersController {
	static usersHandler: UsersHandler;

	constructor(usersHandler: UsersHandler) {
		UsersController.usersHandler = usersHandler;
	}

	public static signin(username: string, password: string): Promise<string> {
		return UsersController.usersHandler.signin(username, password);
	}

	public static signup(
		username: string,
		password: string,
		address?: string,
		age?: number
	): Promise<string> {
		return UsersController.usersHandler.signup(
			username,
			password,
			address,
			age
		);
	}

	public static update(
		_id: mongoose.Types.ObjectId,
		username: string,
		address?: string,
		age?: number
	): Promise<string> {
		return UsersController.usersHandler.update(_id, username, address, age);
	}

	public static checkIdUser(id: string) {
		return UsersController.usersHandler.checkIdUser(id);
	}
}
