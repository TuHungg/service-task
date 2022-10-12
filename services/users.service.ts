"use strict";
import { Context, Service, ServiceBroker, ServiceSchema } from "moleculer";

export default class UsersService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "users",

			settings: {},

			hooks: {},

			actions: {
				getUserssss: {
					rest: "GET /users",

					params: {
						name: "string",
					},

					handler(cxt: any) {
						broker.emit("users.created", cxt.params);

						return "GET USERS!!!";
					},
				},

				signup: {
					rest: "POST /sign-up",

					params: {
						nameUser: "string",
						address: "string",
						age: "number",
						password: "string",
					},

					handler(cxt: any) {
						console.log(cxt.params);

						return cxt.params;
					},
				},

				signin: {
					rest: "POST /sign-in",
					params: {
						username: "string",
						password: "string",
					},
					handler(cxt: any) {
						return cxt.params;
					},
				},

				updateprofie: {
					rest: "PUT /update-profile",
					params: {
						address: "string",
						age: "number",
						password: "string",
					},
					handler(cxt: any) {
						return cxt.params;
					},
				},

				deleteuser: {
					rest: "DELETE /delete-user",
					params: {
						_id: "string",
					},
					handler(cxt: any) {
						return cxt.params;
					},
				},
			},

			methods: {},
			/**
			 * Loading sample data to the collection.
			async afterConnected() {
			 await this.adapter.collection.createIndex({ name: 1 });
			},
			 */
		});
	}
}
