import { Command } from "../../DefineCommand";
import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { PingCommand } from "../../Generic";

export = DefinePlugin({
	name: "Generic",
	description: "Generic",
	commands: [PingCommand],
	public_plugin: true
}) as Plugin;
