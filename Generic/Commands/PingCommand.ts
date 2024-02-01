import { ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { Interaction } from "discord.js";
import { i18n } from "../../i18n/i18n";
import { Wrap } from "../../Wrap";

export const PingCommand: Command = DefineCommand({
  command: {
    name: "ping",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Returns pong!",
    options: []
  },
  on: async (ctx: Context, interaction: Interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const wrapped: Record<"data", string> = await Wrap<string>(i18n(interaction.user.id, "Generic.PingCommand"));
    interaction.reply(wrapped.data)
  }
}) as Command;
