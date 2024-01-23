import type { Snowflake } from "@antibot/interactions";
import  { Status } from "./Status";
import fetch from "cross-fetch";
export default async function (userId: Snowflake): Promise<Status> {
  const data = await fetch(`${process.env.API}/api/v1/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.APITOKEN
    }
  }).then((x) => {
    return x.json().then((res) => {
      return res;
    })
  })
  return data as Status;
}
