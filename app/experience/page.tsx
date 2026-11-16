import { PageHeader } from "@/components/PageHeader";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { certifications, education, experience } from "@/lib/data";

export const metadata = { title: "Experience | Arijit Mitra" };

export default function Experience() {
  return (
    <>
      <PageHeader
        index="03"
        title="Experience"
        intro="From resolving high-priority escalations to owning multi-enterprise integration programs and shipping production fixes."
      />
      <ExperienceTimeline
        experienceList={experience}
        educationList={education}
        certificationList={certifications}
      />
    </>
  );
}
