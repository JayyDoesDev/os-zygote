import type { Snowflake } from "@antibot/interactions";
import UserSchema from "../Models/UserSchema";

export async function l8n(userId: Snowflake, translate: string): Promise<string> {
  const findUser = await UserSchema.findOne({ User: userId });
  if (findUser) {
    const getConfiguredLang: string = findUser.Language;
    const language = await import(`../l8n/${getConfiguredLang}.json`);
    const keys: string[] = translate.split(".");
    let translation = language;
    for (const properties of keys) {
      if (translation.hasOwnProperty(properties)) {
        translation = translation[properties]
      }
    }
    return translation;
  } else {
    const language = require("../l8n/en.json");
    const keys: string[] = translate.split(".");
    let translation = language;
    for (const properties of keys) {
      if (translation.hasOwnProperty(properties)) {
        translation = translation[properties]
      }
    }
  }
}
