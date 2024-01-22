import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Status } from "../../Api/Status";
import { i18n } from "../../i18n/i18n";

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
    console.log(deleteUrl)
    if (deleteUrl.status === 200) {
      return interaction.reply({
        content: (await i18n(interaction.user.id, "UrlShortening.DeleteCommand.200"))
          .replace("{API}", process.env.API)
          .replace("{id}", url) as unknown as string,
        ephemeral: true
      })
    } else {
      return interaction.reply({
        content: await i18n(interaction.user.id, "UrlShortening.DeleteCommand.400"),
        ephemeral: true
      })
    }
  }
}) as Command;
