import { parse } from "https://deno.land/std@0.224.0/yaml/mod.ts";

export default function* ({ resume }) {
  // Read all variant files from resume-variants/
  let entries;
  try {
    entries = [...Deno.readDirSync("src/resume-variants")];
  } catch {
    return;
  }

  for (const entry of entries) {
    if (!entry.name.endsWith(".yml") && !entry.name.endsWith(".yaml")) continue;
    if (entry.name.startsWith("_")) continue;

    const raw = Deno.readTextFileSync(`src/resume-variants/${entry.name}`);
    const variant = parse(raw);

    if (!variant.slug) continue;

    // Deep clone the canonical resume data
    const merged = structuredClone(resume);

    // Apply overrides
    if (variant.summary) {
      merged.summary = variant.summary;
    }

    merged.work = merged.work
      .map((employer) => {
        const filteredPositions = employer.positions
          .filter((pos) => {
            if (variant.hide && variant.hide.includes(pos.title)) return false;
            return true;
          })
          .map((pos) => {
            const updated = { ...pos };

            // Merge additional keywords into skills
            if (variant.keywords && variant.keywords[pos.title]) {
              updated.skills = [
                ...(updated.skills || []),
                ...variant.keywords[pos.title].filter(
                  (k) => !(updated.skills || []).includes(k),
                ),
              ];
            }

            // Override or append highlights
            if (variant.highlights && variant.highlights[pos.title]) {
              updated.highlights = variant.highlights[pos.title];
            }

            return updated;
          });

        if (filteredPositions.length === 0) return null;
        return { ...employer, positions: filteredPositions };
      })
      .filter(Boolean);

    yield {
      url: `/resume/${variant.slug}/`,
      layout: "layouts/resume.vto",
      title: variant.title || "Résumé",
      resume: merged,
      variant: {
        slug: variant.slug,
        jobUrl: variant.jobUrl,
      },
    };
  }
}
