import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { SetLang } from "../Controllers/SetLang";
import { l8n } from "../../l8n/l8n";

export const LanguageCommand = DefineCommand({
  command: {
    name: "language",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Change the language of Zygote to your preferred language!",
    options: [
      {
        type: ApplicationCommandOptionType.STRING,
        name: 'lang',
        description: "Choose the langauge you would like to set Zygote to!",
        choices: [
          {
            name: "English",
            value: "en"
          }
        ],
        required: true
      }
    ]
  },
  on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
    const language = interaction.options.getString("lang");
    await SetLang(language, interaction.user.id);
    return interaction.reply({
      content: (await l8n(interaction.user.id, "Language.LanguageCommand")).replace("{language}", language) as unknown as string,
      ephemeral: true
    });
  }
}) as Command;
