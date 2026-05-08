# Career Accomplishment Library
**Andy Zeigert** | April 2026 | Target Role: Senior Software Engineer / Full-Stack Engineer (Geospatial Focus)

---

## Coaching Feedback

### Your Through-Lines
You are a craftsman. Across every role you have held, the pattern is the same: you find something messy, manual, or fragile and you rebuild it so it works cleanly and repeatably. From newspaper publishing systems to AWS infrastructure, you create foundations that other people build on. The second thread is equally strong: you think about the people who will use the thing, not just the thing itself. Your UX background is not a detour in your career. It is the reason your engineering work gets adopted.

### Positioning Advice
Lead with your infrastructure and platform work at GeoEngineers. Application templates, CI/CD pipelines, cloud security, SSO: this is the story of someone who made an entire engineering team more productive and more secure. Your design background is a differentiator, not a footnote. When other candidates say "I built the feature," you can say "I built the feature and I made sure people actually wanted to use it." For geospatial roles, emphasize that you have spent over a decade in the environmental and engineering domain. You do not need to explain the problem space; you already live in it.

### Watch For
Your path into engineering is non-traditional, and some interviewers will ask about it. Have a confident, brief answer ready: "I came through design and UX, which means I build software that works for real users, not just software that compiles." Your freelance period since March 2026 is recent and short. If asked, keep it simple: you are being intentional about your next role. Do not over-explain. The one gap to prepare for is formal credentials. You do not have a CS degree, and that is genuinely fine, but be ready to point to the template, the CI/CD work, and the cloud security overhaul as proof that you can architect systems, not just build features.

### A Note on Your Confidence
You pushed back more than once in our session on taking too much credit, and that instinct is one of your strengths. It tells me you are the kind of engineer people trust and want to work with. But here is what I want you to hear: building a template that five production apps run on, modernizing an entire team's deployment practice, and mentoring a dozen students through real software projects is not "helping out." That is leadership. You earned every one of these stories. Tell them with the same confidence you bring to your code.

---

## Senior Software Engineer | GeoEngineers, Inc. | March 2021–March 2026

---

### The Template That Became the Foundation

**The Accomplishment**
Designed and built a React/Node/Postgres application template with automated Elastic Beanstalk deployment that reduced new project setup from weeks to hours, with five production applications currently running on it.

**The Challenge**
The existing application template was built on Backbone Marionette and was finicky, highly opinionated, and messy to get started with. Deploying to Elastic Beanstalk required manual, error-prone work in the AWS web console, including VPC, RDS, and EB environment configuration. Getting from idea to a running dev environment could take weeks, and missteps during setup were common.

**What I Did**
I designed a new full-stack template using React, Node.js, and PostgreSQL with well-documented deployment instructions. I converted the manual AWS console deployment process into repeatable CLI commands that handled VPC, RDS, and Elastic Beanstalk setup to match our security requirements. I also built our modern Azure AD authentication pattern directly into the template so every new application inherited SSO by default.

**The Results**
Time from idea to deployed dev environment dropped from weeks to hours or days. Five production applications are currently running on the template, with several more in various stages of development. The template became the standard starting point for developers, supervisors, and student teams, and it eliminated the class of authentication debt that had plagued earlier applications.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Designed full-stack application template with CLI-driven deployment, reducing new project setup from weeks to hours across five production applications.
- **XYZ:** Reduced project setup time from weeks to hours by building a React/Node/Postgres template with automated Elastic Beanstalk deployment.

---

### From Spreadsheets to a System the Whole Company Uses

**The Accomplishment**
Co-led development of a company-wide inventory tracking system that replaced fragmented spreadsheet and email processes, growing to thousands of cataloged entries.

**The Challenge**
Shared resources across the company had no unified tracking process. Equipment was managed through email chains, spreadsheets, and institutional memory. Nobody had a clear picture of what was available, what was checked out, or what was reserved, and the lack of visibility created friction and wasted time.

**What I Did**
I co-led the project with my supervisor, managing a three-student university partnership team from initial concept through full deployment. I personally spent significant time refining the UI and UX because I knew the end users well and understood that any friction in the interface would kill adoption. I brainstormed features with the students and split execution between delegating to the team and implementing changes myself.

**The Results**
The application shipped as a fully deployed product at the end of the student project term, with additional features added afterward to drive wider adoption. It grew to thousands of database entries and became used across the company. The system replaced an entirely manual process with a unified platform for cataloging assets, checking them out, reserving them, generating reports, and scanning QR tags.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Co-led student team building an inventory tracking system, replacing fragmented spreadsheet processes with a unified app adopted company-wide.
- **XYZ:** Drove company-wide adoption of inventory management system by refining UX to eliminate friction for non-technical users.

---

### Locking Down the Cloud

**The Accomplishment**
Restructured the company's AWS infrastructure from shared master credentials and manual processes into a secure, organized environment with proper identity management and secrets handling.

**The Challenge**
Team leads were logging into multiple AWS accounts using shared master usernames and passwords. Hardcoded secret keys were scattered across at least four applications. There was no organizational structure across accounts, no multi-factor authentication, and no role-based access. Security was not being ignored, but there were real holes and vulnerabilities.

**What I Did**
I created an AWS Organization with a new parent account and restructured the existing two accounts under it. I set up an admin group with individual IAM users, enforced MFA, and implemented role assumption for cross-account access, eliminating all use of master credentials. I audited applications for hardcoded secrets and migrated four applications to AWS Secrets Manager or environment variables, generating new keys for anything previously stored in code.

**The Results**
Shared master credentials were fully eliminated. All admin access moved to individual IAM users with MFA and role-based permissions. Four applications had their hardcoded secrets removed and properly secured. The changes were self-initiated and executed with supervisor approval, not assigned from above.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Identified and eliminated shared master credentials across three AWS accounts, implementing IAM, MFA, and secrets management organization-wide.
- **XYZ:** Eliminated credential vulnerabilities across three AWS accounts by restructuring into a managed Organization with IAM and MFA.

---

### Making Deployments Boring

**The Accomplishment**
Replaced manual, error-prone deployment processes with automated CI/CD pipelines, turning unpredictable deploys into repeatable, hands-off operations.

**The Challenge**
Deploying to Elastic Beanstalk meant manually creating a zip file and uploading it through the AWS console, a process that could take minutes or stretch into hours if a step was missed or the archive was built incorrectly. Docker images for ECS applications were being built on developers' local machines and pushed to ECR. Debugging failed deployments was a regular time sink and too often a trial-and-error affair.

**What I Did**
I implemented GitHub Actions deployment pipelines for at least five Elastic Beanstalk applications, replacing the manual zip-and-upload process with automated deployments triggered on PR merge. I set up AWS CodeBuild projects for ECS container applications, removing local Docker image builds from the workflow. I also locked main branches to accept only pull requests, adding a layer of code review discipline.

**The Results**
Deployments that previously consumed minutes to hours of developer attention became automatic on merge. The unpredictability of manual deployments was eliminated along with the debugging time that came with them. The team moved to a consistent, repeatable deployment practice across both EB and ECS applications.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Replaced manual zip-and-upload deployments with GitHub Actions for five applications, eliminating hours of error-prone deployment work.
- **XYZ:** Eliminated manual deployment failures by automating CI/CD pipelines for five Elastic Beanstalk and multiple ECS applications.

---

### Teaching Students to Ship Real Software

**The Accomplishment**
Led four university partnership sessions with approximately twelve computer science students, guiding them through building production software while teaching full-stack development, project management, and stakeholder communication.

**The Challenge**
University CS seniors were arriving with strong academic foundations but little experience building real web applications, working with stakeholders, or managing the full lifecycle of a software project. The projects had to satisfy both academic requirements and genuine business goals, which meant the work had to be real, not simulated. The most recent project involved building an LLM-based safety report chatbot in Azure Foundry, where ensuring answer accuracy and preventing PII exposure proved harder than expected.

**What I Did**
I ran weekly check-ins and code reviews with each three-student team, training them on full-stack principles, project management, and how to gather requirements from real stakeholders. I put students in front of actual end users to force them to think beyond the code. On the LLM chatbot, I led the team through designing secure data access patterns and tackling the accuracy challenges of querying safety report data with natural language.

**The Results**
Four project sessions produced working software, including the inventory tracking system that reached company-wide adoption. Students gained experience they could not have gotten in a classroom: working with real stakeholders, deploying to production environments, and building for actual users. The mentorship program represented roughly 10-20% of my time when active and became a consistent pipeline for useful internal tools.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Led four university partnership sessions with twelve students, delivering production software including a company-wide inventory tracking system.
- **XYZ:** Delivered multiple production applications by mentoring twelve CS students through full-stack development and real stakeholder engagement.

---

## Software Engineer | GeoEngineers, Inc. | January 2018–March 2021

---

### Cutting the Cloud Bill

**The Accomplishment**
Identified and resolved oversized cloud instances and purchasing gaps across AWS accounts, reducing monthly compute costs by approximately 20%.

**The Challenge**
Monthly AWS spend was running around $4,000 per month, and questions about the bill were coming from management. Several applications were running on instances far larger than their workloads required. There were no savings plans or reserved instances in place, meaning the company was paying full on-demand pricing for predictable, steady-state workloads.

**What I Did**
I audited the applications running across our AWS accounts and identified instances that were significantly oversized for their actual usage. I right-sized those instances to match real workload requirements. I then researched and pushed for savings plan and reserved instance purchases to lock in lower rates for our predictable compute needs.

**The Results**
Monthly compute costs dropped by approximately 20%, translating to hundreds of dollars per month in savings that compounded over time. The changes were self-identified, not assigned. I brought the analysis and recommendations to my supervisor for approval and then executed the changes myself.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Audited AWS accounts and right-sized oversized instances, reducing monthly compute costs by approximately 20% across all environments.
- **XYZ:** Reduced monthly AWS compute costs by 20% by right-sizing instances and implementing savings plans and reserved instances.

---

### Getting GeoGrab into the App Stores

**The Accomplishment**
Built and deployed GeoGrab, a React Native geospatial data collection tool, through the full mobile distribution pipeline to both iOS and Android app stores.

**The Challenge**
The application originated as a student partnership project and needed to be carried through to production deployment. Getting a React Native app from running in a local emulator to being available in two app stores is significantly more complex than web deployment. The team's experience was primarily in web applications, not mobile distribution, and the build and signing processes for both platforms had to be navigated from scratch.

**What I Did**
I took ownership of the build and deployment pipeline, working through the platform-specific requirements for both iOS and Android distribution. I managed the signing, packaging, and submission processes for both app stores. I adapted the student team's initial codebase into a production-ready application that could be distributed to field staff.

**The Results**
GeoGrab shipped to both the iOS App Store and Google Play Store, giving field staff a custom geospatial data creation tool on their mobile devices. The project expanded the team's capabilities beyond web development into mobile distribution. It also demonstrated the viability of React Native for the company's geospatial tooling needs.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Carried a student-originated React Native geospatial app through full mobile deployment to both iOS and Android stores.
- **XYZ:** Delivered a geospatial data collection tool to both app stores by managing the full React Native build and distribution pipeline.

---

### Building with the User in the Room

**The Accomplishment**
Embedded user research and stakeholder feedback directly into the development workflow, hosting brown bag sessions and shaping application design around real user needs.

**The Challenge**
Applications were being built for scientists, engineers, and field specialists, but the development process did not have a structured way to gather user input during the build cycle. Decisions about workflows and interfaces were often made without direct input from the people who would use the tools daily.

**What I Did**
I hosted brown bag sessions for applications in development, bringing stakeholders and end users into the feedback loop while features were still being shaped. I spent significant time on user stories, workflow sketching, UI design, and HTML template refinement. I brought my UX design background directly into the engineering process, treating usability as an engineering requirement rather than a design afterthought.

**The Results**
Applications developed with this feedback loop had stronger adoption because the people using them had been part of shaping them. The practice of bringing users into the development process became part of how the team worked. It also helped build trust between the development team and the internal stakeholders who depended on the tools.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Hosted stakeholder brown bag sessions during development cycles, embedding user feedback into application design for stronger adoption.
- **XYZ:** Improved application adoption by embedding UX research and stakeholder brown bags directly into the development workflow.

---

## UX/UI Designer | GeoEngineers, Inc. | July 2015–January 2018

---

### Making the Tools People Actually Wanted to Use

**The Accomplishment**
Redesigned two to three existing internal applications from unintuitive, visually rough tools into usable products that employees across the company adopted.

**The Challenge**
The applications that existed when I joined were functional but ugly and unintuitive. Users across the company were expected to use these tools, but the interfaces created friction that discouraged adoption. There was no established UX practice on the team and no formal process for evaluating or improving usability.

**What I Did**
I dove into UX research, attending Nielsen Group training conferences and spending significant time studying and implementing best practices. I applied those practices directly to the existing applications, redesigning workflows and interfaces to reduce friction and improve clarity. I brought a professional UX discipline to a team that had not previously had one.

**The Results**
Users across the company noticed the difference and appreciated that someone was thinking about their experience. Adoption increased for the redesigned applications, even if precise numbers were not tracked. The work established a UX-aware culture on the development team that carried forward into all future application work.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Redesigned legacy internal applications using Nielsen Group best practices, transforming unintuitive tools into products users adopted willingly.
- **XYZ:** Increased adoption of internal tools by redesigning interfaces with professional UX practices learned through Nielsen Group training.

---

### Establishing a User Testing Practice

**The Accomplishment**
Implemented the team's first user testing frameworks, creating a structured process for evaluating application usability before and after releases.

**The Challenge**
There was no formal mechanism for testing how users interacted with applications. Usability issues were discovered after deployment through complaints or workarounds rather than through structured evaluation. The team was building tools for technical specialists, but nobody was systematically asking whether those specialists could actually use them effectively.

**What I Did**
I designed and implemented user testing frameworks that gave the team a repeatable way to evaluate application usability. I collaborated with stakeholders to translate their requirements into testable design criteria. I used these frameworks to identify friction points in existing applications and validate design decisions before they shipped.

**The Results**
The team gained a structured way to evaluate usability rather than relying on anecdotal feedback after launch. Design decisions became more grounded in evidence. The testing practice contributed to the broader shift toward user-centered development that continued through my engineering roles.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Implemented user testing frameworks for internal applications, creating structured usability evaluation where none previously existed.
- **XYZ:** Established the team's first structured usability testing process by designing and implementing user testing frameworks for internal tools.

---

### Translating Stakeholder Needs into Usable Designs

**The Accomplishment**
Built a collaborative requirements process that bridged the gap between what stakeholders described and what users actually needed, improving design outcomes across multiple applications.

**The Challenge**
Stakeholders knew what they needed their tools to accomplish but often described requirements in domain-specific terms that did not translate directly into interface decisions. The gap between what was requested and what would actually work well for end users was a recurring source of rework and frustration.

**What I Did**
I positioned myself as the translator between stakeholders and the development process, facilitating requirements conversations that surfaced both the stated need and the underlying workflow. I sketched interfaces collaboratively with stakeholders so they could see their requirements taking shape before development began. I used these conversations to identify assumptions and resolve conflicts early.

**The Results**
Applications developed through this collaborative process required less rework because misunderstandings were caught during design rather than after build. Stakeholders felt heard and invested in the tools being built for them. The practice of collaborative requirements translation became part of how the team approached new projects.

**Resume Bullets** *(1 sentence each — max 25 words / 2 lines)*
- **PAR:** Facilitated collaborative requirements sessions with stakeholders, catching design misunderstandings early and reducing post-build rework across applications.
- **XYZ:** Reduced application rework by translating stakeholder requirements into validated interface designs through collaborative sketching and early feedback.

---

## Interview STAR Stories

*Your top 3–5 stories mapped to the interview questions they answer best. These are your go-to answers for behavioral interviews.*

### The Template That Became the Foundation *(from GeoEngineers)*
**Best for:** "Tell me about a time you improved a process or system."
**Also works for:** "Tell me about a time you identified a problem and fixed it without being asked."

**STAR Story:** When I joined the senior engineering team at GeoEngineers, our application template was built on Backbone Marionette and was finicky and difficult to work with, and deploying new apps to Elastic Beanstalk required manual, error-prone work in the AWS console that could take weeks. I designed a new full-stack template using React, Node, and Postgres with well-documented deployment instructions, and I converted the entire manual deployment process into repeatable CLI commands that handled VPC, RDS, and EB configuration. I also built our modern Azure AD authentication pattern directly into the template so every new app inherited SSO by default. The result was that new project setup went from weeks to hours, and five production applications are currently running on that template. It became the standard starting point for every developer on the team, including student partnership teams.

**Takeaway:** This story demonstrates the infrastructure thinking and platform-building mindset I bring to engineering teams, where I focus on making the entire team more productive, not just shipping my own features.

---

### From Spreadsheets to a System the Whole Company Uses *(from GeoEngineers)*
**Best for:** "Tell me about a time you collaborated with others to deliver a result."
**Also works for:** "Tell me about a time you had to balance multiple stakeholders' needs."

**STAR Story:** GeoEngineers had no unified system for tracking shared equipment and resources. People relied on email chains, spreadsheets, and memory, and nobody had a clear picture of what was available or checked out. I co-led the project with my supervisor, managing a three-student university team from concept through deployment. I personally spent significant time refining the UI and UX because I knew the end users and understood that any interface friction would prevent adoption. The application shipped at the end of the student term with catalog, checkout, reservation, QR scanning, and reporting features, and after adding a few more features it grew to thousands of entries and was adopted across the entire company.

**Takeaway:** This story shows how I combine technical leadership with UX instincts to build tools that people actually adopt, which is critical for any role where the software has to serve non-technical users.

---

### Locking Down the Cloud *(from GeoEngineers)*
**Best for:** "Tell me about a time you identified a problem and fixed it without being asked."
**Also works for:** "Tell me about a time you improved security or reduced risk."

**STAR Story:** When I started taking ownership of our cloud infrastructure at GeoEngineers, I found that team leads were logging into multiple AWS accounts with shared master usernames and passwords, and at least four applications had hardcoded secret keys in the codebase. I created an AWS Organization, set up individual IAM users with MFA and role assumption for cross-account access, and eliminated all use of shared master credentials. I then audited every application for hardcoded secrets and migrated them to AWS Secrets Manager or environment variables, generating new keys for anything that had been exposed in code. The entire security posture of our cloud infrastructure changed from ad hoc to properly managed, and I initiated all of this work myself rather than waiting for it to be assigned.

**Takeaway:** This demonstrates my habit of looking beyond my immediate feature work to identify systemic risks, which is especially important in roles where I will be trusted with cloud infrastructure and sensitive data.

---

### Teaching Students to Ship Real Software *(from GeoEngineers)*
**Best for:** "Tell me about a time you developed or mentored others."
**Also works for:** "Tell me about a time you led a team through a difficult or ambiguous project."

**STAR Story:** Over my senior engineer tenure at GeoEngineers, I led four university partnership sessions with roughly twelve computer science students total, each project lasting three terms. The students arrived with academic CS skills but had never built a real web application, worked with stakeholders, or deployed to production. I ran weekly check-ins and code reviews, trained them on full-stack development and project management, and put them in front of actual end users to force them to think beyond the code. One team built the inventory tracking system that went company-wide, and the most recent team was tackling an LLM-based safety chatbot where accuracy and PII protection were genuinely hard problems. The students left with skills their CS programs had not taught them, and the company got production software out of the partnership.

**Takeaway:** This story shows that I can lead and develop junior engineers through complex, real-world projects, a skill that translates directly to mentoring teammates and building team capability in any senior engineering role.

---

## Final Thoughts for Interviewing

- Own your craft. You built templates that teams run on, pipelines that deploy themselves, and tools that entire companies adopted. When you walk into an interview, you are not asking for a chance. You are offering proven capability.
- Practice out loud. Your stories are strong on paper, but they need to feel natural when you say them. Record yourself telling the template story or the inventory tracking story, listen back, and trim anything that feels like filler. Muscle memory matters.
- Lead with what changed. Every one of your best stories has a clear before and after: weeks became hours, spreadsheets became a system, shared passwords became proper IAM. Open with that contrast and the interviewer will lean in.

---

*©SparkEffect | support@sparkeffect.com | www.sparkeffect.com*
*Prepared with the SparkEffect Career Accomplishment Portfolio Builder*
