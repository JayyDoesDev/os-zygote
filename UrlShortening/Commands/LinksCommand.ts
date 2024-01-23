import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { Status } from "../../Api/Status";

export const LinksCommand: Command = DefineCommand({
  command: {
    name: "links",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Get the shortened links you have created!",
    options: []
  },
  on: async (ctx: Context, interaction: Interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const links: Status = await ctx.api.links(interaction.user.id);

    if (links.status === 302) {
      return interaction.reply({
        content: colorfulBlock(links.data.contents.map((x, i) => `\u001b[0;31m${i + 1}. \u001b[0;32mhttps://zyte.cloud/${x.URLID} \u001b[0;30m| \u001b[0;35m${x.Link}\u001b[0;31m`).join("\n")),
        ephemeral: true
      });
    }
  }
})

function colorfulBlock(content: string): string {
  return `\`\`\`ansi\n${content}\`\`\``;
}
