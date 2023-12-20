import lume from "lume/mod.ts";
import blog from "https://deno.land/x/lume_theme_simple_blog/mod.ts";
import favicon from "lume/plugins/favicon.ts";
import picture from "lume/plugins/picture.ts";
import transformImages from "lume/plugins/transform_images.ts";

const site = lume({
    src: "./src",
  })
  .use(blog())
  .use(favicon())
  .use(picture())
  .use(transformImages())

export default site;