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
          author: {
            name: "Zygote Plugins",
            url: "https://zyte.cloud",
            icon_url: ctx.user.avatarURL()
          },
          thumbnail: {
            url: interaction.user.avatarURL()
          },
          fields: plugins,
          color: Colors.Green,
          footer: {
            text: "Use /language to change the language!"
          }
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              style: ButtonStyle.Link,
              label: "Website",
              url: "https://zyte.cloud"
            },
            {
              type: ComponentType.Button,
              style: ButtonStyle.Link,
              label: "Docs",
              url: "https://gist.github.com/JayyDoesDev/a3e7530c7be6a5f063aaeb8f148c2ab5"
            },
            {
              type: ComponentType.Button,
              style: ButtonStyle.Link,
              label: "Github",
              url: "https://github.com/JayyDoesDev/os-zygote"
            }
          ]
        }
      ]
    })
  }
}) as Command;
