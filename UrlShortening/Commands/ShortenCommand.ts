import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Status } from "../../Api/Status";
import { i18n } from "../../i18n/i18n";
import { Wrap } from "../../Wrap";

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
    const wrapped428: Record<"data", string> = await Wrap<string>(i18n(interaction.user.id, "UrlShortening.ShortenCommand.428"));
    const wrapped400: Record<"data", string> = await Wrap<string>(i18n(interaction.user.id, "UrlShortening.ShortenCommand.400"));
    const wrappedShortened: Record<"data", string> = await Wrap<string>(i18n(interaction.user.id, "UrlShortening.ShortenCommand.200.shortened"));
    const wrappedOld: Record<"data", string> = await Wrap<string>(i18n(interaction.user.id, "UrlShortening.ShortenCommand.200.old"));
    const wrappedNew: Record<"data", string> = await Wrap<string>(i18n(interaction.user.id, "UrlShortening.ShortenCommand.200.new"));
    switch (shorten.status) {
      case 428:
        return interaction.reply({
          content: wrapped428.data,
          ephemeral: true
        });
      case 400:
        return interaction.reply({
          content: wrapped400.data,
          ephemeral: true
        });
      default:
        return interaction.reply({
          content: `
          # ${wrappedShortened.data}
          # ${wrappedOld.data}
          ## <${url}>
          # ${wrappedNew.data}
          ## <${shorten.data.url}>
          `,
          ephemeral: true
        });
    };
  },
}) as Command;
