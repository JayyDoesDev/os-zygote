import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { ApplicationCommandType } from "@antibot/interactions";
import { ShortenCommand } from "../../UrlShortening";

export = DefinePlugin({
	name: "Url Shortening",
	description: "Shorten urls!",
	commands: [ShortenCommand],
	public_plugin: true
})