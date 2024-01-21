import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { LanguageCommand } from "../../Language/Commands/LanguageCoommand";

export = DefinePlugin({
  name: "Language",
  description: "Change the language of Zygote!",
  commands: [LanguageCommand],
  public_plugin: true
}) as Plugin;
