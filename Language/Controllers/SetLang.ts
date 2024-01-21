import { ChatInputCommandInteraction } from "discord.js";
import UserSchema from "../../Models/UserSchema";
import { Schema } from "mongoose";
import type { Snowflake } from "@antibot/interactions";
export async function SetLang(lang: string, userId: Snowflake): Promise<void> {
  const findUser = await UserSchema.findOne({ User: userId });
  if (findUser) {
    await UserSchema.updateOne(
      {
        User: userId,
      },
      {
        $set: { Language: lang },
      }
    );
  } else {
    await new UserSchema({
      User: userId
    }).save();

    await UserSchema.updateOne(
      {
        User: userId,
      },
      {
        $set: { Language: lang },
      }
    )
  }
}
