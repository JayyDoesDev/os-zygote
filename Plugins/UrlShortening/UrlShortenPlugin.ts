import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { DeleteCommand, ShortenCommand } from "../../UrlShortening";

export = DefinePlugin({
  name: "Url Shortening",
  description: "Shorten urls!",
  commands: [ShortenCommand, DeleteCommand],
  public_plugin: true
}) as Plugin;
