import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { PatCommand, SlapCommand, BiteCommand } from "../../Anime";

export = DefinePlugin({
	name: "Anime",
	description: "Anime related commands!",
	commands: [PatCommand, SlapCommand, BiteCommand],
	public_plugin: true
}) as Plugin;
