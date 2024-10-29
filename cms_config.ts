import lumeCms from "lume_cms/mod.ts";
import GitHub from "lume_cms/storage/github.ts";
import { Octokit } from "npm:octokit";

const cms = lumeCms();

// Register GitHub storage
cms.storage(
  "gh",
  new GitHub({
    client: new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") }),
    owner: "ajzeigert",
    repo: "zeigert.com",
  }),
);

// Now you can create documents, collections, and uploads using the gh storage:
cms.collection("posts", "gh:posts", [
  "title: text",
  "tags: list",
  "draft: checkbox",
  "content: markdown",
]);

export default cms;
