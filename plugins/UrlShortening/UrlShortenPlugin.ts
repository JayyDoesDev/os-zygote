import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { ShortenCommand } from "../../UrlShortening";

export = DefinePlugin({
  name: "Url Shortening",
  description: "Shorten urls!",
  commands: [ShortenCommand],
  public_plugin: true
}) as Plugin;
