import { Context } from "./Context";
import { config } from "dotenv";
import { SetupMongo } from "./SetupMongo";
config();
const ctx: Context = new Context();

["Command", "Event"].forEach(async (x) => {
	await require(`./handlers/${x}`).default(ctx);
});

ctx.login(process.env.TOKEN);
