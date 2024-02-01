import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Colors } from "../../Colors";
import { Wrap, FluxResponse } from "../../Wrap";

export const BiteCommand: Command = DefineCommand({
  command: {
    name: "bite",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Bite people!",
    options: [
      {
        name: "user",
        description: "Provide the user you would like to Bite",
        type: ApplicationCommandOptionType.USER,
        required: true
      }
    ]
  },
  on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
    const user = interaction.options.getUser("user");
    const wrapped = await Wrap<FluxResponse>(ctx.flux.sfw.gifs.getBite() as any)
    interaction.reply({
      embeds: [
        {
          description: `**${interaction.user.username}** has bitten **${user.username}**! (,,>__<,,)`,
          image: {
            url: wrapped.data.file,
          },
          color: Colors.Scarlet,
          footer: {
            icon_url: "https://fluxpoint.dev/img/icons/fluxpoint.png",
            text: "Powered by https://fluxpoint.dev"
          }
        }
      ]
    })
  }
})
