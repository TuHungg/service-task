import { Service, ServiceBroker } from "moleculer";
import { appNest } from "../src/main";

export default class ApiService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);
		// @ts-ignore
		this.parseServiceSchema({
			name: "nodechild",

			created() {
				// await appNest();
				appNest();
			},
		});
	}
}
