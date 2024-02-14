import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Colors } from "../../Colors";
import { Wrap, FluxResponse } from "../../Wrap";

export const BiteCommand: Command = DefineCommand({
  command: {
    name: "kiss",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Kiss people!",
    options: [
      {
        name: "user",
        description: "Provide the user you would like to kiss",
        type: ApplicationCommandOptionType.USER,
        required: true
      }
    ]
  },
  on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
    const user = interaction.options.getUser("user");
    const wrapped = await Wrap<FluxResponse>(ctx.flux.sfw.gifs.getKiss() as any)
    interaction.reply({
      embeds: [
        {
          description: `**${interaction.user.username}** has kissed **${user.username}**! (˶  >   ₃  < ˶)♡`,
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
