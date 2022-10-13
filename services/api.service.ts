import { NestFactory } from "@nestjs/core";
import { Service, ServiceBroker } from "moleculer";
import ApiGateway from "moleculer-web";
import { AppModule } from "src/main.module";
import { appNest } from "../src/main";

export default class ApiService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);
		// @ts-ignore
		this.parseServiceSchema({
			name: "nodechild",
			// mixins: [ApiGateway],
			// More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html

			created() {
				// await appNest();
				appNest();
			},
		});
	}
}
