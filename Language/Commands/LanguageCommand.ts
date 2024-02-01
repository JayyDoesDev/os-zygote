import { ApplicationCommandOptionType, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { SetLang } from "../Controllers/SetLang";
import { i18n } from "../../i18n/i18n";
import { Wrap } from "../../Wrap";

export const LanguageCommand: Command = DefineCommand({
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
            name: "Spanish",
            value: "es"
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
    const lang: string = language == "en" ? `${language} :flag_us:` : `${language} :flag_${language}:`;
    await SetLang(language, interaction.user.id);
    const wrapped: Record<"data", string> = await Wrap<string>(i18n(interaction.user.id, "Language.LanguageCommand"));
    return interaction.reply({
      content: wrapped.data.replace("{language}", lang),
      ephemeral: true
    });
  }
}) as Command;
