import cms from "blog/_cms.ts";
import GitHub from "lume/cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const user = Deno.env.get("CMS_USERNAME");
const password = Deno.env.get("CMS_PASSWORD");

cms.storage(
  "src",
  new GitHub("ajzeigert/zeigert.com/src", Deno.env.get("GITHUB_TOKEN")),
);

cms.auth({
  [user]: password,
});

export default cms;
