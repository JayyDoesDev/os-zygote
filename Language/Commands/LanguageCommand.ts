import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { SetLang } from "../Controllers/SetLang";
import { i18n } from "../../i18n/i18n";

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
          },
          {
            name: "Bengali",
            value: "bn"
          },
          {
            name: "Albanian",
            value: "sq"
          },
          {
            name: "Dutch",
            value: "nl"
          },
          {
            name: "German",
            value: "de"
          },
          {
            name: "Romanian",
            value: "ro"
          },
          {
            name: "Polish",
            value: "pl"
          },
          {
            name: "French",
            value: "fr"
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
      content: (await i18n(interaction.user.id, "Language.LanguageCommand")).replace("{language}", language) as unknown as string,
      ephemeral: true
    });
  }
}) as Command;
