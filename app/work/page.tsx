import { PageHeader } from "@/components/PageHeader";
import { WorkList } from "@/components/WorkList";
import { getProjects } from "@/lib/content";

export const metadata = { title: "Work | Arijit Mitra" };
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  return (
    <>
      <PageHeader index="01" title="Work" intro="Production fixes, automations and products. Open one to read the story behind it." />
      <WorkList projects={await getProjects()} />
    </>
  );
}
