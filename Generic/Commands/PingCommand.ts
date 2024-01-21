import { ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { Interaction } from "discord.js";

export const PingCommand = DefineCommand({
  command: {
    name: "ping",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Returns pong!",
    options: []
  },
  on: (ctx: Context, interaction: Interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    interaction.reply("Pong")
  }
}) as Command;
