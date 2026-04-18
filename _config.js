import lume from "lume/mod.ts";
import blog from "blog/mod.ts";
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
		}),
	)
	.use(
		favicon({
			input: "/favicon.png",
		}),
	)
	.use(picture())
	.use(
		transformImages({
			extensions: [".jpg", ".jpeg", ".png", ".tiff", ".psd", ".pdf"],
		}),
	)
	.add("img")
	.use(
		robots({
			allow: ["Googlebot", "Bingbot"],
			disallow: ["ChatGPT-User"],
		}),
	)
	.filter("resumeDate", (d) => {
		if (!d) return "Present";
		const s = String(d);
		const parts = s.split("-");
		if (parts.length === 1) return s;
		const months = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December",
		];
		return months[parseInt(parts[1], 10) - 1] + " " + parts[0];
	})
	.ignore("resume-variants")
	// .copy("projects/scrollymap")
	.copy("projects")
	.copy("BingSiteAuth.xml");

export default site;
