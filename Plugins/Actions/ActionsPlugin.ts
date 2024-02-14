import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { ActionCommand } from "../../Actions";

export = DefinePlugin({
	name: "Actions",
	description: "Action commands!",
	commands: [ActionCommand],
	public_plugin: true
}) as Plugin;
