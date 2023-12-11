import lume from "lume/mod.ts";
import unocss from "lume/plugins/unocss.ts";
// import pageFind from "lume/plugins/pagefind.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import sitemap from "lume/plugins/sitemap.ts";
import favicon from "lume/plugins/favicon.ts";
import nav from "lume/plugins/nav.ts";
// import feed from "lume/plugins/feed.ts";

const site = lume({
    src: "src",
});

site.copy("assets")
    .use(codeHighlight())
    .use(sitemap())
    .use(favicon())
    .use(nav())
    // .use(pageFind({
    //     ui: {
    //         resetStyles: false,
    //     }
    // }))
    // .use(feed())
    .use(unocss({
        // reset: 'eric-meyer'
    }))

export default site;
