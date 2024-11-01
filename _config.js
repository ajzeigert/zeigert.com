import lume from "lume/mod.ts";
import blog from "https://deno.land/x/lume_theme_simple_blog@v0.14.0/mod.ts";
import favicon from "lume/plugins/favicon.ts";
import picture from "lume/plugins/picture.ts";
import transformImages from "lume/plugins/transform_images.ts";
import robots from "lume/plugins/robots.ts";
import cleanFeed from "./src/utils/cleanfeed.js";

const site = lume({
	src: "./src",
	location: new URL("https://zeigert.com"),
})
	.use(
		blog({
			feed: {
				items: {
					// content: 'Test'
					content: (data) => {
						//   console.log('data', data)
						return cleanFeed(data.children);
					},
				},
			},
		})
	)
	.use(favicon())
	.use(picture())
	.use(
		transformImages({
			extensions: [".jpg", ".jpeg", ".png", ".tif", ".psd", ".pdf"],
		})
	)
	.use(
		robots({
			allow: ["Googlebot", "Bingbot"],
			disallow: ["ChatGPT-User"],
		})
	)
	.copy("BingSiteAuth.xml");

// import cms from "./cms_config.ts";

// Init the CMS and return an Hono instance with the app
// const app = cms.init();

// Run a local server with your CMS
// Deno.serve(app.fetch);

export default site;
