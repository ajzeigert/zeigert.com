import Server from "lume/core/server.ts";
import expires from "https:/deno.land/x/lume/middlewares/expires.ts";
import not_found from "https://deno.land/x/lume@v2.0.3/middlewares/not_found.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(expires());

server.use(
  not_found({
    page404: "404.html",
    directoryIndex: true,
  }),
);

server.start();

console.log("Listening on http://localhost:8000");
