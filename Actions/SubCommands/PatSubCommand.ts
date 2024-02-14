import { ApplicationCommandOptionType, ApplicationCommandOptions } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Wrap, FluxResponse } from "../../Wrap";
import { Colors } from "../../Colors";
export const ActionPatSubCommand: ApplicationCommandOptions = {
  name: "pat",
  description: "Pat your friends!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: [
    {
      name: "user",
      description: "Provide the user you would liek to pat",
      type: ApplicationCommandOptionType.USER,
      required: true
    }
  ]
} as ApplicationCommandOptions;

export async function RunActionPatSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): Promise<void> {
  if (interaction.options.getSubcommand() === "pat") {
    const user = interaction.options.getUser("user");
    const wrapped = await Wrap<FluxResponse>(ctx.flux.sfw.gifs.getPat() as any);
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
            text: "Powered by https://fluxpoint.dev"
          }
        }
      ]
    })
  };
}
