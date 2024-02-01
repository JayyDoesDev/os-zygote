import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Colors } from "../../Colors";
import { Wrap, FluxResponse } from "../../Wrap";

export const PatCommand: Command = DefineCommand({
  command: {
    name: "pat",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Pat your friends!",
    options: [
      {
        name: "user",
        description: "Provide the user you would like to pat",
        type: ApplicationCommandOptionType.USER,
        required: true
      }
    ]
  },
  on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
    const user = interaction.options.getUser("user");
    const wrapped = await Wrap<FluxResponse>(ctx.flux.sfw.gifs.getPat() as any)
    interaction.reply({
      embeds: [
        {
          description: `**${interaction.user.username}** has patted **${user.username}**! :3`,
          image: {
            url: wrapped.data.file,
          },
          color: Colors.Scarlet,
          footer: {
            icon_url: "https://fluxpoint.dev/img/icons/fluxpoint.png",
            text: "Powered by https://flxupoint.dev"
          }
        }
      ]
    })
  },
}) as Command;
