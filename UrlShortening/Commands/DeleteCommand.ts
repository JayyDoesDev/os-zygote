import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Status } from "../../Api/Status";
import { i18n } from "../../i18n/i18n";
import { Wrap } from "../../Wrap";

export const DeleteCommand: Command = DefineCommand({
  command: {
    name: "delete",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Delete your urls if you want to!",
    options: [
      {
        type: ApplicationCommandOptionType.STRING,
        name: "id",
        description: "Enter the id of the url you want to delete!",
        required: true
      }
    ]
  },
  on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
    const url: string = interaction.options.getString("id");
    const deleteUrl: Status = await ctx.api.delete(interaction.user.id, url);
    const wrapped200: Record<"data", string> = await Wrap<string>(i18n(interaction.user.id, "UrlShortening.DeleteCommand.200"));
    const wrapped400: Record<"data", String> = await Wrap<string>(i18n(interaction.user.id, "UrlShortening.DeleteCommand.400"));
    if (deleteUrl.status === 200) {
      return interaction.reply({
        content:
        wrapped200.data
        .replace("{API}", process.env.API)
        .replace("{id}", url) as unknown as string,
        ephemeral: true
      })
    } else {
      return interaction.reply({
        content: wrapped400.data as string,
        ephemeral: true
      })
    }
  }
}) as Command;
