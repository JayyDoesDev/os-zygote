import { ApplicationCommandOptions, ApplicationCommandOptionType } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { Wrap, FluxResponse } from "../../Wrap";
import { Colors } from "../../Colors";

export const ActionSlapSubCommand: ApplicationCommandOptions = {
  name: "slap",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  description: "Slap people",
  options: [
    {
      name: "user",
      description: "Provide the user you would like to slap",
      type: ApplicationCommandOptionType.USER,
      required: true
    }
  ]
} as ApplicationCommandOptions;

export async function RunSlapSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): Promise<void> {
  if (interaction.options.getSubcommand() === "slap") {
    const user = interaction.options.getUser("user");
    const wrapped = await Wrap<FluxResponse>(ctx.flux.sfw.gifs.getSlap() as any)
    interaction.reply({
      embeds: [
        {
          description: `**${interaction.user.username}** has slapped **${user.username}**! ( ｡ •̀ ᴖ •́ ｡)`,
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
}
