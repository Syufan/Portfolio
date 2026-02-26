import { getProfile } from "@/services/api";
import { Job } from "@/types";
import Link from "next/link";

export default async function Home() {
  const data = await getProfile();
  return (
    <div className="flex flex-col  gap-20 py-19">
      <section id="about">
        {data.about.paragraphs.map((p: string, i: number) => (
          <p key={i} className="text-slate-400 mt-4">{p}</p>
        ))}
      </section>

      <section id="experience">
        {data.experience.map((job: Job, i: number) => (
          <div key={i} className="flex gap-8 mb-12">
            <p className="text-slate-400 text-sm w-40 shrink-0 pt-0.5">{job.period}</p>

            <div>
              <h3 className="text-white font-semibold">{job.role} · {job.company}</h3>

              <ul className="mt-4 flex flex-col gap-2">
              {job.bullets.map((bullet, j) => (
                <li key={j} className="text-slate-400 text-sm">{bullet}</li>
              ))}
              </ul>

              <div className="flex gap-2 mt-4 flex-wrap">
                {job.techStack.map((tech, k) => (
                  <span key={k} className="text-teal-300 text-xs border border-teal-300/20 bg-teal-300/10 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </section>

      <section id="projects">
        <Link href="/projects" className="text-teal-300 flex items-center gap-2 mt-8">
          View Full Project Archive →
        </Link>
      </section>
    </div>
  );
}
