import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Status } from "../../Api/Status";
import { i18n } from "../../i18n/i18n";

export const ShortenCommand: Command = DefineCommand({
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
          content: await i18n(interaction.user.id, "UrlShortening.ShortenCommand.428") as unknown as string,
          ephemeral: true
        });
      case 400:
        return interaction.reply({
          content: await i18n(interaction.user.id, "UrlShortening.ShortenCommand.400") as unknown as string,
          ephemeral: true
        });
      default:
        return interaction.reply({
          content: `
          # ${await i18n(interaction.user.id, "UrlShortening.ShortenCommand.200.shortened")}
          # ${await i18n(interaction.user.id, "UrlShortening.ShortenCommand.200.old")}
          ## <${url}>
          # ${await i18n(interaction.user.id, "UrlShortening.ShortenCommand.200.new")}
          ## <${shorten.data.url}>
          `,
          ephemeral: true
        });
    };
  },
}) as Command;
