"use strict";
import { Service, ServiceBroker } from "moleculer";
import { UsersController } from "../src/users/users.controller";

export default class UsersService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "users",

			settings: {},

			hooks: {},

			actions: {
				signup: {
					rest: "POST /sign-up",

					params: {
						username: "string",
						password: { type: "string", min: 6 },
						address: "string",
						age: "number",
					},

					handler: this.signup,
				},

				signin: {
					rest: "POST /sign-in",
					params: {
						username: "string",
						password: "string",
					},
					handler: this.signin,
				},
			},

			methods: {},
		});
	}

	private async signin(ctx: any) {
		const { username, password } = ctx.params;

		const signin = await UsersController.signin(username, password);

		return signin;
	}

	private async signup(ctx: any) {
		const { username, password, address, age } = ctx.params;

		console.log(username, password, address, age);

		const created = await UsersController.signup(
			username,
			password,
			address,
			age
		);

		return created;
	}
}
