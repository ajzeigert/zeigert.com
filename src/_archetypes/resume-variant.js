export default function (name) {
	const slug = name.replace(/\s+/g, "-").toLowerCase();
	return {
		path: `resume-variants/${slug}.yml`,
		content: {
			title: `Résumé — ${name}`,
			slug,
			jobUrl: "",
			summary: "",
			keywords: {},
			hide: [],
			highlights: {},
		},
	};
}
