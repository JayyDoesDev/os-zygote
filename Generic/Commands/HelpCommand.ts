import { ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { Interaction } from "discord.js";

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

    const plugins = []
    ctx.plugin.forEach((x) => {
      if (!x.public_plugin) {
        return;
      }

      plugins.push({ name: x.name, value: `\`${x.commands.map((x) => `/${x.command.name}`).join(", ")}\`` })
    })
    interaction.reply({
      embeds: [
        {
          author: {
            name: "Zygote Plugins",
            url: "https://zyte.cloud",
            icon_url: ctx.user.avatarURL()
          },
          thumbnail: {
            url: interaction.user.avatarURL()
          },
          fields: plugins,
          color: 0x008000,
          footer: {
            text: "Use /language to change the language!"
          }
        },
      ]
    })
  }
}) as Command;
