import { Command } from "../../DefineCommand";
import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { PatCommand } from "../../Anime";

export = DefinePlugin({
	name: "Anime",
	description: "Anime related commands!",
	commands: [PatCommand],
	public_plugin: true
}) as Plugin;
