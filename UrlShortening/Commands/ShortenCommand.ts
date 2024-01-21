import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Status } from "../../api/Status";

export const ShortenCommand = DefineCommand({
	command: {
		name: "shorten",
		type: ApplicationCommandType.CHAT_INPUT,
		description: "Shorten a url of your choice!",
		options: [
			{
				type: ApplicationCommandOptionType.STRING,
				name: 'url',
				description: 'Enter the url you want to shorten!',
				required: true
			}
		]
	},
	on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
		if (!interaction.isCommand()) {
			return;
		}
		
		const url: string = interaction.options.getString("url");
		const shorten: Status = await ctx.api.shorten(interaction.user.id, url);

		interaction.reply({
			content: shorten.message
		})
	}
}) as Command;