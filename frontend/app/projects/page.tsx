import { getProjects } from "@/services/api";
import { getProfile } from "@/services/api";
import { Project } from "@/types";
import Link from "next/link";

export default async function ProjectsPage() {
    const projects = await getProjects();
    const data = await getProfile();
    const name = data.about.name;

    return (
        <div className="py-16 px-20 min-h-screen bg-slate-900 py-16 px-20">
            <Link href="/" className="text-teal-300 text-sm">← {name}</Link>
            <h1 className="text-5xl font-bold text-white mt-1">All Projects</h1>

            <table className="w-full mt-12 border-collapse">
                <thead>
                    <tr className="text-slate-200 text-sm border-b border-slate-700 font-normal">
                        <th className="text-left py-4 w-16">Year</th>
                        <th className="text-left py-4">Project</th>
                        <th className="text-left py-4">Built with</th>
                        <th className="text-left py-4">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project: Project, i: number) => (
                        <tr key={i} className="border-b border-slate-700">
                            <td className="py-4 text-slate-400 text-sm">{project.year}</td>
                            <td className="py-4 max-w-sm">
                                <p className="text-white font-semibold">{project.name}</p>
                                <p className="text-slate-400 text-sm mt-1">{project.description}</p>
                            </td>

                            <td className="py-4">
                                <div className="flex gap-2 flex-wrap">
                                    {project.techStack.map((tech, j) => (
                                    <span key={j} className="text-teal-300 text-xs border border-teal-300/20 bg-teal-300/10 px-3 py-1 rounded-full">
                                        {tech}
                                    </span>
                                    ))}
                                </div>
                            </td>
                            <td className="py-4">
                                {project.url.live && <a href={project.url.live} className="text-slate-400 text-sm">Live ↗</a>}
                                {project.url.github && <a href={project.url.github} className="text-slate-400 text-sm">GitHub ↗</a>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
