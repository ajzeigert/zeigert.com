import date, { Options as DateOptions } from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import terser from "lume/plugins/terser.ts";
import prism, { Options as PrismOptions } from "lume/plugins/prism.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import metas from "lume/plugins/metas.ts";
import pagefind, { Options as PagefindOptions } from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import readingInfo from "lume/plugins/reading_info.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.5.1/toc.ts";
import image from "https://deno.land/x/lume_markdown_plugins@v0.5.1/image.ts";
import footnotes from "https://deno.land/x/lume_markdown_plugins@v0.5.1/footnotes.ts";
import favicon from "lume/plugins/favicon.ts";
import picture from "lume/plugins/picture.ts";
import transformImages from "lume/plugins/transform_images.ts";

import "lume/types.ts";

export interface Options {
  prism?: Partial<PrismOptions>;
  date?: Partial<DateOptions>;
  pagefind?: Partial<PagefindOptions>;
}

/** Configure the site */
export default function (options: Options = {}) {
  return (site: Lume.Site) => {
    site.use(postcss())
      .use(basePath())
      .use(toc())
      .use(prism(options.prism))
      .use(readingInfo())
      .use(date(options.date))
      .use(metas())
      .use(favicon())
      .use(image())
      .use(footnotes())
      .use(resolveUrls())
      .use(slugifyUrls())
      .use(terser())
      .use(pagefind(options.pagefind))
      .use(sitemap())
      .use(feed({
        output: ["/feed.xml", "/feed.json"],
        query: "type=post",
        info: {
          title: "=metas.site",
          description: "=metas.description",
        },
        items: {
          title: "=title",
        },
      }))
      .use(picture())
      .use(transformImages())
      .copy("fonts")
      .copy("js")
      // .copy("favicon.png")
      .preprocess([".md"], (pages) => {
        for (const page of pages) {
          page.data.excerpt ??= (page.data.content as string).split(
            /<!--\s*more\s*-->/i,
          )[0];
        }
      });

    // Basic CSS Design System
    site.remoteFile(
      "_includes/css/ds.css",
      "https://unpkg.com/@lumeland/ds@0.3.2/ds.css",
    );

    // Mastodon comment system
    site.remoteFile(
      "/js/comments.js",
      "https://unpkg.com/@oom/mastodon-comments@0.2.1/src/comments.js",
    );
  };
}