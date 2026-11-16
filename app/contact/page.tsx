import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { profile, resumeUrl } from "@/lib/data";

export const metadata = { title: "Contact | Arijit Mitra" };

export default function Contact() {
  return (
    <>
      <PageHeader index="05" title="Let's talk." intro="Working on something in fintech, credit, or AI automation? Send a note and I'll reply." />
      <section className="mx-auto mt-12 grid max-w-6xl gap-12 px-5 md:grid-cols-[1.2fr_1fr] md:gap-20 md:px-8">
        <Reveal><ContactForm /></Reveal>
        <Reveal delay={0.1}>
          <ul className="space-y-6 border-t border-line pt-6 md:border-0 md:pt-0">
            {[
              ["Email", profile.email, `mailto:${profile.email}`],
              ["LinkedIn", "arijit-mitra", profile.linkedin],
              ["GitHub", "View profile", profile.github],
              ["Resume", "View CV", resumeUrl],
            ].map(([k, v, h]) => (
              <li key={k}>
                <p className="label">{k}</p>
                <a href={h} target={k === "Email" ? undefined : "_blank"} rel="noopener noreferrer" className="font-display text-2xl transition hover:text-accent">{v} ↗</a>
              </li>
            ))}
            <li>
              <p className="label">Based in</p>
              <p className="font-display text-2xl">{profile.location}</p>
            </li>
          </ul>
        </Reveal>
      </section>
    </>
  );
}
