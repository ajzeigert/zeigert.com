import cms from "blog/_cms.ts";
import GitHub from "lume/cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const user = Deno.env.get("CMS_USERNAME");
const password = Deno.env.get("CMS_PASSWORD");

cms.storage(
	"src",
	new GitHub({
		client: new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") }),
		owner: "ajzeigert",
		repo: "zeigert.com",
		path: "src",
	})
);

cms.auth({
	[user]: password,
});

export default cms;
