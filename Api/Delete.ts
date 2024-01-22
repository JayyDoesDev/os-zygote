import type { Snowflake } from "@antibot/interactions";
import { Status } from "./Status";
export default async function (userId: Snowflake, id: string): Promise<Status> {
  const data = await fetch(`${process.env.API}/api/v1/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Authorization": process.env.APITOKEN
    },
    body: JSON.stringify({
      userid: userId
    })
  }).then((x) => {
    return x.json().then((res) => {
      return res;
    })
  })
  return data as Status;
}
