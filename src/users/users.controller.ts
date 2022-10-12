import { Controller } from "@nestjs/common";

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
}
