export default function* ({ resume }) {
  const jsonResume = {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: resume.basics,
    work: resume.work.flatMap((employer) =>
      employer.positions.map((position) => ({
        name: employer.company,
        location: employer.location,
        position: position.title,
        startDate: position.startDate,
        endDate: position.endDate || undefined,
        highlights: position.highlights || [],
        skills: position.skills || [],
      }))
    ),
    education: resume.education.map((edu) => ({
      institution: edu.institution,
      area: edu.area,
      studyType: edu.studyType,
      startDate: String(edu.startDate),
      endDate: String(edu.endDate),
      location: edu.location,
      description: edu.description,
    })),
  };

  yield {
    url: "/resume.json",
    content: JSON.stringify(jsonResume, null, 2),
  };
}
