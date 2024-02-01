import { Client, Partials } from "discord.js";
import { ZillaCollection } from "@antibot/zilla";
import { Command } from "./DefineCommand";
import { Interactions, Snowflake } from "@antibot/interactions";
import { Plugin } from "./DefinePlugin";
import { Status } from "./Api/Status";
import { FluxpointClient } from "fluxpoint-js";

export class Context extends Client {
  public plugin: ZillaCollection<string, Plugin>;
  public cooldown: ZillaCollection<string, Command>;
  public interactions: ZillaCollection<string, Command>;
  public interact: Interactions;
  public flux: FluxpointClient;
  public api: {
    shorten: Function;
    delete: Function;
    links: Function;
  }
  constructor() {
    super({
      intents: ["Guilds", "GuildMessages", "GuildMembers"],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
      ],
      allowedMentions: {
        parse: ["everyone"],
      },
    });
    this.plugin = new ZillaCollection<string, Plugin>();
    this.cooldown = new ZillaCollection<string, Command>();
    this.interactions = new ZillaCollection<string, Command>();
    this.interact = new Interactions({
      publicKey: process.env.PUBLICKEY as unknown as string,
      botID: process.env.BOTID as unknown as string,
      botToken: process.env.TOKEN as unknown as string,
      debug: true,
    });
    this.flux = new FluxpointClient({
      token: process.env.FLUXPOINTKEY
    });
    this.api = {
      shorten: (userId: Snowflake, url: string): Status => {
        return require('./Api/Shorten').default(userId, url) as Status;
      },
      delete: (userId: Snowflake, id: string): Status => {
        return require('./Api/Delete').default(userId, id) as Status;
      },
      links: (userid: Snowflake): Status => {
        return require('./Api/Links').default(userid) as Status;
      }
    }
  }
}
