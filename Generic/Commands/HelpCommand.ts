import { ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ButtonStyle, ComponentType, Interaction } from "discord.js";
import { Colors } from "../../Colors";

export const HelpCommand: Command = DefineCommand({
  command: {
    name: "help",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Get help!",
    options: []
  },
  on: (ctx: Context, interaction: Interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const plugins = [];
    ctx.plugin.forEach((x) => {
      if (!x.public_plugin) {
        return;
      }

      plugins.push({ name: x.name, value: `\`${x.commands.map((x) => `/${x.command.name}`).join(", ")}\`` });
    });
    interaction.reply({
      embeds: [
        {
          title: ctx.user.username,
          thumbnail: {
            url: ctx.user.avatarURL()
          },
          description: "**:information_source: Lacy is a multipurpose Discord Bot built for utility and entertainment!**",
          fields: plugins,
          color: Colors.Yellow,
          footer: {
            icon_url: ctx.user.avatarURL(),
            text: "Lacy • lacy.weeb.ws"
          }
        },
      ],
    })
  }
}) as Command;
