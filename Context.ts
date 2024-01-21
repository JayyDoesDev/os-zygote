import { Client, Partials } from "discord.js";
import { ZillaCollection } from "@antibot/zilla";
import { Command } from "./DefineCommand";
import { Interactions, Snowflake } from "@antibot/interactions";
import { Plugin } from "./DefinePlugin";
import { Status } from "./api/Status";

export class Context extends Client {
	public plugin: ZillaCollection<string, Plugin>;
	public cooldown: ZillaCollection<string, Command>;
	public interactions: ZillaCollection<string, Command>;
	public interact: Interactions;
	public api: {
		shorten: Function; 
	}
	constructor() {
		super({
			intents: ["Guilds", "GuildMessages", "GuildMembers"],
			partials: [
				Partials.Channel,
				Partials.GuildMember,
				Partials.Message,
				Partials.User,
			],
			allowedMentions: {
				parse: ["everyone"],
			},
		});
		this.plugin = new ZillaCollection<string, Plugin>();
		this.cooldown = new ZillaCollection<string, Command>();
		this.interactions = new ZillaCollection<string, Command>();
		this.interact = new Interactions({
			publicKey: process.env.PUBLICKEY as unknown as string,
			botID: process.env.BOTID as unknown as string,
			botToken: process.env.TOKEN as unknown as string,
			debug: true,
		});
		this.api = {
			shorten: (userid: Snowflake, url: string): Status => {
				return require('./api/Shorten').default(userid, url) as Status;
			}
		}
	}
}
