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
        max_length: 2000,
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
    switch (shorten.status) {
      case 428:
        return interaction.reply({
          content: "Your url didn't seem valid <:stare:860590417245241395>",
          ephemeral: true
        });
      case 400:
        return interaction.reply({
          content: "Looks like a problem happened on our side, please try again later! <:shock:867330764713492491>",
          ephemeral: true
        });
      default:
        return interaction.reply({
          content: `
          # <:SenkoWave:861323878056067132> Your url as been shortened!
          # Old url
          ## <${url}>
          # New Shortened url
          ## <${shorten.data.url}>
          `,
          ephemeral: true
        });
    };
  },
}) as Command;
