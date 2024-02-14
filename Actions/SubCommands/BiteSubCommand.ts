import { ApplicationCommandOptionType, ApplicationCommandOptions } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { Wrap, FluxResponse } from "../../Wrap";
import { Colors } from "../../Colors";

export const ActionBiteSubCommand: ApplicationCommandOptions = {
  name: "bite",
  description: "Bite people!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: [
    {
      name: "user",
      description: "Provide the user you would like to bite",
      type: ApplicationCommandOptionType.USER,
      required: true
    }
  ]
} as ApplicationCommandOptions;

export async function RunActionBiteSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): Promise<void> {
  if (interaction.options.getSubcommand() === "bite") {
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
}
