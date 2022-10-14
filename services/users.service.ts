import { Service, ServiceBroker } from "moleculer";
import { UsersController } from "../src/users/users.controller";
import { signupdto } from "../src/users/dto/signup.dto";
import { signindto } from "../src/users/dto/signin.dto";

export default class UsersService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "user",

			settings: {},

			hooks: {},

			actions: {
				getAllUser: {
					rest: "GET /",

					handler: this.getAllUser,
				},

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

				checkIdUser: {
					handler: this.getcheckIdUser,
				},

				verifyToken: {
					handler: this.verifyToken,
				},
			},

			events: {},

			methods: {},
			dependencies: ["nodechild"],
		});
	}

	public async getcheckIdUser(ctx: any) {
		const { userId } = ctx.params;

		const checkId = await UsersController.checkIdUser(userId);

		return checkId;
	}

	private async signin(ctx: any) {
		const { username, password }: signindto = ctx.params;

		const signined = await UsersController.signin(username, password);

		return signined;
	}

	private async signup(ctx: any) {
		const { username, password, address, age } = ctx.params;

		const created = await UsersController.signup(
			username,
			password,
			address,
			age
		);

		return created;
	}

	private async verifyToken(ctx: any) {
		const { token } = ctx.params;

		console.log(token);

		const verify = UsersController.verifyToken(token);

		return verify;
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

	private async getAllUser() {
		const listusers = await UsersController.getAllUser();

		return listusers;
	}
}
