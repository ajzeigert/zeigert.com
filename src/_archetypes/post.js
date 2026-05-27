export default function (title) {
	const date = new Date();
	const output = date.toISOString().slice(0, 10);

	const slug = `${output}-${title.replace(/\s+/g, "-").toLowerCase()}`;
	return {
		path: `posts/${slug}.md`,
		content: {
			title,
			date: output,
			metas: { image: "" },
			comments: { src: "" },
			draft: true,
			content: "Don't get cocky",
		},
	};
}
