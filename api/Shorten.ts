import type { Snowflake } from "@antibot/interactions";
import { Status } from "./Status";
export default async function (userId: Snowflake, url: String): Promise<Status> {
	const data = await fetch(`${process.env.API}/api/v1/shorten`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": process.env.APITOKEN
		},
		body: JSON.stringify({
			userid: userId,
			link: url
		})
	}).then((x) => {
		return x.json().then((res) => {
			return res;
		})
	})
	return data as Status;
}