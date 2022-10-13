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
						username: { type: "string", optional: true },
						password: { type: "string", min: 6, optional: true },
						address: "string",
						age: "number",
					},

					handler: this.signup,
				},

				signin: {
					rest: "POST /sign-in",
					params: {
						username: { type: "string", optional: true },
						password: { type: "string", optional: true },
					},
					handler: this.signin,
				},

				update: {
					rest: "PUT /update-profile",

					params: {
						_id: { type: "string", optional: true },

						username: { type: "string", optional: false },

						address: { type: "string", optional: false },

						age: { type: "string", optional: false },
					},

					handler: this.update,
				},
			},

			events: {
				"userTaskManagement.create": {
					async handler(ctx: any) {
						// const { userId } = ctx.params;

						console.log(ctx);

						// const checkId = await UsersController.checkIdUser(
						// 	userId
						// );

						return ctx.params;
					},
				},
			},

			methods: {},
		});
	}

	private async checkIdUser(ctx: any) {
		const { userId } = ctx.params;

		const checkId = await UsersController.checkIdUser(userId);

		return checkId;
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

	private async update(ctx: any) {
		const { _id, username, address, age } = ctx.params;

		console.log(_id, username, address, age);

		const updatedUser = await UsersController.update(
			_id,
			username,
			address,
			age
		);

		return updatedUser;
	}
}
